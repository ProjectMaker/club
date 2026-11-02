'use client'
import { useState } from "react";
import Link from "next/link";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getOfferRequestCounts, getOfferRequests } from "@/data-access-layers/offer-requests";
import { OFFERS, getOfferTitle } from "@/app/offers/_data";
import { OfferRequest } from "@/models";
import { formatDate } from "@/utils/functions";
import { useDebounce } from "@/utils/hooks";
import { OFFER_REQUEST_STATUSES } from "@/utils/constants";
import Search from "@/components/ui/Search";
import Select from "@/components/ui/Select";
import StatusBadge from "./_StatusBadge";

const OFFER_OPTIONS = [
  { value: '', label: 'Toutes les offres' },
  ...OFFERS.map(({ slug, title }) => ({ value: slug, label: title })),
]

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
    queryKey: ['offer-requests', 'list', verbatim, offer, status],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => getOfferRequests({ verbatim, offer, status, page: pageParam, count: 20 }),
    // Les demandes arrivent depuis le site public : on ne se fie jamais au cache (30 min par défaut)
    staleTime: 0,
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
  // Clé sous « offer-requests » : un changement de statut sur une fiche rafraîchit aussi les compteurs
  const { data: counts } = useQuery({
    queryKey: ['offer-requests', 'counts', debouncedVerbatim, offer],
    queryFn: () => getOfferRequestCounts({ verbatim: debouncedVerbatim, offer }),
    staleTime: 0,
  })
  // « En cours » : toutes les demandes sauf les archivées
  const getCount = (value: string) => counts && (value
    ? counts[value as keyof typeof counts]
    : counts.new + counts.follow_up + counts.done)
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
              {counts && (
                <span className={`ml-2 rounded-full px-1.5 py-0.5 text-xs font-semibold ${status === filter.value ? 'bg-white/25' : 'bg-white/10'}`}>
                  {getCount(filter.value)}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-72">
            <Select
              variant="glass"
              size="sm"
              ariaLabel="Filtrer par offre"
              value={offer}
              options={OFFER_OPTIONS}
              onChange={setOffer}
              className="!rounded-lg !py-2"
            />
          </div>
          <Search value={verbatim} onChange={setVerbatim} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 text-red-200 text-sm">
          Impossible de charger les demandes : {error.message}
        </p>
      )}
      {isLoading && (
        <p className="text-white/70 mt-4">Chargement des demandes...</p>
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
