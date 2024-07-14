import Books from './books'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { getBooks } from '@/server/getBooks'
// import { redirect } from 'next/navigation'

export default async function Home ({ searchParams }: any) {
  const queryClient = new QueryClient()
  const page = parseInt(searchParams?.page) || 1

  await queryClient.prefetchQuery({
    queryKey: ['books', page],
    // @ts-ignore
    queryFn: () => getBooks(page)
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Books page={page} />
      </HydrationBoundary>
    </>
  )
}
