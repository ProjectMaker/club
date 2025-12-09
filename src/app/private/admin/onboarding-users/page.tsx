'use client'
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getOnboardingUsers, getCountOnboardingUsers } from "@/data-access-layers/users";
import { formatDate } from "@/utils/functions";
import { User } from "@/models";
import { useDebounce } from "@/utils/hooks";
import Search from "@/components/ui/Search";

function useList({ verbatim }: { verbatim: string }) {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['onboarding-users', verbatim],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      return getOnboardingUsers({
        verbatim,
        page: pageParam,
        count: 20,
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
  const { data, isLoading } = useQuery({
    queryKey: ['count-onboarding-users'],
    queryFn: () => getCountOnboardingUsers()
  })
  return (
    <div className="text-white">Nombre total d'utilisateurs : {isLoading ? '...' : data}</div>
  )
}

export default function Users() {
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

  if (users.length === 0) {
    return (
      <div>
        <h1 className="text-white text-xl font-bold mt-3">Aucun utilisateur à valider</h1>
      </div>
    )
  }

  return (
    <div>
      {users.length > 0 && (
        <>
          {/* Tableau */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 w-full mx-auto mt-2 p-6">
            <Search value={verbatim} onChange={setVerbatim} />
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Email
                  </th>
                  <th className="text-left py-2 px-4 text-white font-semibold">
                    Date de création
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
                    <td className="py-2 px-4 text-white/80">
                      {formatDate(user.created_at)}
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