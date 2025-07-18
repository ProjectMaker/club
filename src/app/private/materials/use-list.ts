'use client'
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMaterials } from "@/data-access-layers/materials"

const PAGE_SIZE = 6

export default function useMaterials() {
  const {
      data,
      isLoading,
      isFetching,
      isFetchingNextPage,
      error,
      fetchNextPage,
      hasNextPage
    } = useInfiniteQuery({
      queryKey: ['materials'],
      initialPageParam: 1,
      queryFn: ({pageParam = 1}) => {
        return getMaterials({
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