'use client'
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPressings } from "@/data-access-layers/pressings"

const PAGE_SIZE = 6

export default function useLaundries() {
  const {
      data,
      isLoading,
      isFetching,
      isFetchingNextPage,
      error,
      fetchNextPage,
      hasNextPage
    } = useInfiniteQuery({
      queryKey: ['laundries'],
      initialPageParam: 1,
      queryFn: ({pageParam = 1}) => {
        return getPressings({
          from: (pageParam - 1) * PAGE_SIZE,
          to: pageParam * PAGE_SIZE - 1 ,
        })
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length + 1 : undefined;
      }
    })
    return {
      data,
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