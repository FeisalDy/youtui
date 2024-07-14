import Books from './books'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { getBooks } from '@/server/getBooks'
import { redirect } from 'next/navigation'
import { DefaultPagination } from '@/components/pagination/Pagination'

export default async function Home ({ searchParams }: any) {
  const queryClient = new QueryClient()
  const page = parseInt(searchParams?.page) || 1

  await queryClient.prefetchQuery({
    queryKey: ['books', page],
    // @ts-ignore
    queryFn: () => getBooks(page)
  })

  const navigate = (page: number, isNext: boolean) => {
    if (isNext) {
      redirect(`/books?page=${page + 1}`)
    }
    if (!isNext) {
      redirect(`/books?page=${page - 1}`)
    }
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Books page={page} />
      </HydrationBoundary>
      <DefaultPagination />
    </>
  )
}
