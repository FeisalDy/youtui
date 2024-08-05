import BookListCore from './BookListCore'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { getBookList } from '@/server/getBooklist'

export default async function BooKListPage ({ searchParams }: any) {
  const queryClient = new QueryClient()
  const page = parseInt(searchParams?.page) || 1

  queryClient.prefetchQuery({
    queryKey: ['booklist', page],
    // @ts-ignore
    queryFn: () => getBookList(page)
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookListCore page={page} />
      </HydrationBoundary>
    </>
  )
}
