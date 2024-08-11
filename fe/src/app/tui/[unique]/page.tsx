import { getDetailTui } from '@/server/getTui'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import BookCore from './BookCore'

export default function ShowBookList ({
  params
}: {
  params: { unique: string | number }
}) {
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['tui', 'book', params.unique],
    queryFn: () => getDetailTui(params.unique)
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookCore unique={params.unique} />
      </HydrationBoundary>
    </>
  )
}
