'use client'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '@/hooks/useQuery'
import { z } from 'zod'
import { getBookList } from '@/server/getBooklist'
import { BookListT } from '@/types/booklist'
import BookListCard from './BookListCard'

type PropsT = {
  page: number
}
const queryParamSchema = z.object({
  bookListName: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional()
})

export default function BookListCore ({ page }: PropsT) {
  const { queryParams, setQueryParams } = useQueryParams({
    schema: queryParamSchema,
    defaultValues: {}
  })

  const { data, error, isLoading } = useQuery({
    queryKey: ['booklist', page],
    queryFn: () =>
      getBookList({
        bookListName: queryParams.bookListName,
        page: queryParams.page,
        limit: queryParams.limit
      })
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const { data: booklist, pagination } = data as BookListT

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='grid grid-flow-row auto-rows-max gap-y-6 mx-4 '>
        {booklist.map((book, index) => (
          <BookListCard key={book.id} data={book} />
        ))}
      </div>
    </div>
  )
}
