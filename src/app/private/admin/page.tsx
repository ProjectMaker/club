'use client'
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getUsers, getCountUsers } from "@/data-access-layers/users";
import { formatDate } from "@/utils/functions";
import { User } from "@/models";
import { useDebounce } from "@/utils/hooks";
import Search from "@/components/ui/Search";

type OwnerFilter = 'laundries' | 'pressings' | 'carwashes';

const FILTER_OPTIONS: { value: OwnerFilter; label: string; icon: React.ReactNode; activeColor: string }[] = [
  { 
    value: 'laundries', 
    label: 'Laveries',
    activeColor: 'from-blue-500 to-cyan-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  { 
    value: 'pressings', 
    label: 'Pressings',
    activeColor: 'from-violet-500 to-purple-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  { 
    value: 'carwashes', 
    label: 'Car Wash',
    activeColor: 'from-emerald-500 to-teal-400',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  },
];

function useList({ verbatim, ownerFilters }: { verbatim: string; ownerFilters: OwnerFilter[] }) {
  const searchParams = useSearchParams();
  const isApproved = searchParams.get('approved') === 'true';
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['users', isApproved, verbatim, ownerFilters],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      return getUsers({
        verbatim,
        page: pageParam,
        count: 20,
        isApproved,
        ownerFilters
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: string | any[], pages: string | any[]) => {
      return lastPage.length > 0 ? pages.length + 1 : undefined;
    }
  })
  return {
    users: data?.pages.flat() || [],
    isLoading,
    isFetching,
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

function CountUsers({ ownerFilters }: { ownerFilters: OwnerFilter[] }) {
  const searchParams = useSearchParams();
  const isApproved = searchParams.get('approved') === 'true';
  const { data, isLoading } = useQuery({
    queryKey: ['count-users', isApproved, ownerFilters],
    queryFn: () => getCountUsers({ isApproved, ownerFilters })
  })
  return (
    <div className="text-white">Nombre total d&apos;utilisateurs : {isLoading ? '...' : data}</div>
  )
}

function OwnerFilters({ 
  selectedFilters, 
  onFilterChange 
}: { 
  selectedFilters: OwnerFilter[]; 
  onFilterChange: (filters: OwnerFilter[]) => void;
}) {
  const handleToggleFilter = (filter: OwnerFilter) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {FILTER_OPTIONS.map(({ value, label, icon, activeColor }) => {
        const isActive = selectedFilters.includes(value);
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleToggleFilter(value)}
            onKeyDown={(e) => e.key === 'Enter' && handleToggleFilter(value)}
            aria-label={`Filtrer par ${label}`}
            aria-pressed={isActive}
            tabIndex={0}
            className={`
              group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
              transition-all duration-300 ease-out cursor-pointer select-none
              ${isActive 
                ? `bg-gradient-to-r ${activeColor} text-white shadow-lg shadow-white/10` 
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10 hover:border-white/20'
              }
            `}
          >
            <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
              {icon}
            </span>
            <span>{label}</span>
            {isActive && (
              <svg className="w-3.5 h-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function Admin() {
  const [verbatim, setVerbatim] = useState('');
  const [ownerFilters, setOwnerFilters] = useState<OwnerFilter[]>([]);
  const debouncedVerbatim = useDebounce(verbatim, 500);
  const {
    users,
    isLoading,
    error,
    fetchNextPage,
    shouldFetchNextPage,
    isFetchingNextPage
  } = useList({
    verbatim: debouncedVerbatim,
    ownerFilters
  });


  return (
    <div>
      <div className="flex justify-between mt-3 space-x-4 mt-3 items-center">
        <CountUsers ownerFilters={ownerFilters} />
        <OwnerFilters selectedFilters={ownerFilters} onFilterChange={setOwnerFilters} />
        <Search value={verbatim} onChange={setVerbatim} />
      </div>
      {
        users.length === 0 && !isLoading && (
          <h1 className="text-white text-xl font-bold">Aucun utilisateur</h1>
        )
      }
      {users.length > 0 && (
        <>
          {/* Tableau */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 w-full mx-auto mt-2 p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Email
                  </th>
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Prénom
                  </th>
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Nom
                  </th>
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Laveries
                  </th>
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Pressings
                  </th>
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Auto
                  </th>
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Date de création
                  </th>
                  <th className="text-left py-3 px-4 text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index: any) => (
                  <tr
                    key={user.id || index}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-2 px-4 text-white">
                      {debouncedVerbatim ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: String(user.email || '')?.replace(
                              new RegExp(`(${debouncedVerbatim})`, 'gi'),
                              '<mark class="bg-yellow-300 text-black px-1 rounded">$1</mark>'
                            )
                          }}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="py-2 px-4 text-white/80">{user.firstname}</td>
                    <td className="py-2 px-4 text-white/80">{user.lastname}</td>
                    <td className="py-2 px-4 text-white/80">
                      {user.laundries_number}
                    </td>
                    <td className="py-2 px-4 text-white/80">
                      {user.pressings_number}
                    </td>
                    <td className="py-2 px-4 text-white/80">
                      {user.carwashes_number}
                    </td>
                    <td className="py-2 px-4 text-white/80">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/private/admin/${user.id}?approved=${user.is_approved}`}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
                        >
                          Voir
                        </Link>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bouton pour charger plus de données */}
          {shouldFetchNextPage && (
            <div className="mt-8 text-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-3 py-1.5 rounded-md font-medium transition-colors duration-200 disabled:cursor-not-allowed text-sm mb-4"
              >
                {isFetchingNextPage ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement...
                  </span>
                ) : (
                  'Charger plus d\'utilisateurs'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}