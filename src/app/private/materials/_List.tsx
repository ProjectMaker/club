import useList from "./use-list"

export default function MaterialsList() {
  const { data, isLoading, isFetching, fetchNextPage, shouldFetchNextPage, error } = useList()

  
  return (
    <div>
      <h1>Materials List</h1>
    </div>
  )
}