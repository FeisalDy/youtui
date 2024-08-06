import { getBookListById } from '@/server/getBooklist'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import ShowBookList from './ShowBookList'

export default function BookListPage ({ params }: { params: { id: number } }) {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['booklist', params.id],
    // @ts-ignore
    queryFn: () => getBookListById(params.id)
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShowBookList id={params.id} />
      </HydrationBoundary>
    </>
  )
}
