'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getUsers, getCountUsers } from "@/data-access-layers/users";
import { formatDate } from "@/utils/functions";
import { User } from "@/models";
import { useDebounce } from "@/utils/hooks";
import Search from "@/components/ui/Search";


function useList({ verbatim }: { verbatim: string }) {
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
    queryKey: ['users', isApproved, verbatim],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      return getUsers({
        verbatim,
        page: pageParam,
        count: 20,
        isApproved
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

function CountUsers() {
  const searchParams = useSearchParams();
  const isApproved = searchParams.get('approved') === 'true';
  const { data, isLoading } = useQuery({
    queryKey: ['count-users', isApproved],
    queryFn: () => getCountUsers({ isApproved })
  })
  return (
    <div className="text-white">Nombre total d&apos;utilisateurs : {isLoading ? '...' : data}</div>
  )
}

export default function Admin() {
  const [verbatim, setVerbatim] = useState('');
  const debouncedVerbatim = useDebounce(verbatim, 500);
  const {
    users,
    isLoading,
    error,
    fetchNextPage,
    shouldFetchNextPage,
    isFetchingNextPage
  } = useList({
    verbatim: debouncedVerbatim
  });


  return (
    <div>
      <div className="flex justify-between mt-3 space-x-4 mt-3 items-center">
        <CountUsers />
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