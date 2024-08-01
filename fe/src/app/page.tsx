import fetch from 'isomorphic-unfetch'
import { BookList, Book } from '@/types/book'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { getBooks } from '@/server/getBooks'
import LandingPage from '@/components/home/LandingPage'

export default async function Home () {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['book'],
    // @ts-ignore
    queryFn: getBooks
  })

  return (
    <div className='max-w-6xl mx-auto'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LandingPage />
      </HydrationBoundary>
    </div>
  )
}
