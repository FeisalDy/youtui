'use client'
import { BookCore } from '@/components/tui/BookCore'
import { useQuery } from '@tanstack/react-query'
import { Book } from '@/types/tui'
import { BookSkeleton } from '@/components/tui/BookSkeleton'
import AppPagination from '@/components/tui/pagination/AppPagination'
import { getTuis } from '@/server/getTui'
import { useQueryParams } from '@/hooks/useQuery'
import { z } from 'zod'

const queryParamSchema = z.object({
  tag: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  length: z.number().optional()
})

export default function BookPage (): JSX.Element {
  const { queryParams, setQueryParams } = useQueryParams({
    schema: queryParamSchema,
    defaultValues: {}
  })

  const page = queryParams.page
  const limit = queryParams.limit
  const tag = queryParams.tag
  const length = queryParams.length

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['book', page, tag, limit],
    queryFn: () => getTuis(page, tag, limit, length)
  })

  if (isPending) {
    return <BookSkeleton />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      {data.data.map((item: Book) => (
        <BookCore key={item.book_id} item={item} />
      ))}
      <div className='flex justify-center mt-4'>
        <AppPagination data={data.pagination} setQueryParams={setQueryParams} />
      </div>
    </>
  )
}
