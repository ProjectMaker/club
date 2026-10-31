'use client'
import { useState } from "react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getOfferRequests } from "@/data-access-layers/offer-requests";
import { OFFERS, getOfferTitle } from "@/app/offers/_data";
import { OfferRequest } from "@/models";
import { formatDate } from "@/utils/functions";
import { useDebounce } from "@/utils/hooks";
import { OFFER_REQUEST_STATUSES } from "@/utils/constants";
import Search from "@/components/ui/Search";
import StatusBadge from "./_StatusBadge";

const STATUS_FILTERS = [
  { value: '', label: 'En cours' },
  ...OFFER_REQUEST_STATUSES.map(({ value, label }) => ({ value, label })),
]

function useList({ verbatim, offer, status }: { verbatim: string, offer: string, status: string }) {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['offer-requests', verbatim, offer, status],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => getOfferRequests({ verbatim, offer, status, page: pageParam, count: 20 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: OfferRequest[], pages: OfferRequest[][]) => lastPage.length > 0 ? pages.length + 1 : undefined,
  })
  return {
    requests: data?.pages.flat() || [],
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage: () => {
      if (!isFetching) {
        return fetchNextPage()
      }
    },
    shouldFetchNextPage: hasNextPage,
  }
}

export default function AdminOfferRequests() {
  const [verbatim, setVerbatim] = useState('')
  const [offer, setOffer] = useState('')
  const [status, setStatus] = useState('')
  const debouncedVerbatim = useDebounce(verbatim, 500)
  const { requests, isLoading, error, fetchNextPage, shouldFetchNextPage, isFetchingNextPage } = useList({
    verbatim: debouncedVerbatim,
    offer,
    status,
  })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par statut">
          {STATUS_FILTERS.map(filter => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={status === filter.value}
              onClick={() => setStatus(filter.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${status === filter.value
                ? 'bg-blue-500 text-white shadow-lg shadow-white/10'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="Filtrer par offre"
            value={offer}
            onChange={event => setOffer(event.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-gray-800">Toutes les offres</option>
            {OFFERS.map(({ slug, title }) => <option key={slug} value={slug} className="text-gray-800">{title}</option>)}
          </select>
          <Search value={verbatim} onChange={setVerbatim} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 text-red-200 text-sm">
          Impossible de charger les demandes : {error.message}
        </p>
      )}
      {requests.length === 0 && !isLoading && !error && (
        <h1 className="text-white text-xl font-bold mt-4">Aucune demande</h1>
      )}
      {requests.length > 0 && (
        <>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 w-full mx-auto mt-2 p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-4 text-white font-semibold">Référence</th>
                  <th className="text-left py-2 px-4 text-white font-semibold">Date</th>
                  <th className="text-left py-2 px-4 text-white font-semibold">Offre</th>
                  <th className="text-left py-2 px-4 text-white font-semibold">Demandeur</th>
                  <th className="text-left py-2 px-4 text-white font-semibold">Statut</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr key={request.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                    <td className="py-2 px-4 text-white font-mono text-sm whitespace-nowrap">{request.reference}</td>
                    <td className="py-2 px-4 text-white/80 whitespace-nowrap">{formatDate(request.created_at, true)}</td>
                    <td className="py-2 px-4 text-white/80">{getOfferTitle(request.offer)}</td>
                    <td className="py-2 px-4 text-white/80">
                      <div className="text-white">{request.firstname} {request.lastname}</div>
                      <div className="text-xs text-white/60">{request.email} · {request.phone_number}</div>
                      <div className="text-xs text-white/50">{request.user_id ? 'Membre' : 'Visiteur'}</div>
                    </td>
                    <td className="py-2 px-4"><StatusBadge status={request.status} /></td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/private/admin/offers/${request.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
                      >
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {shouldFetchNextPage && (
            <div className="mt-8 text-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-3 py-1.5 rounded-md font-medium transition-colors duration-200 disabled:cursor-not-allowed text-sm mb-4"
              >
                {isFetchingNextPage ? 'Chargement...' : 'Charger plus de demandes'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
