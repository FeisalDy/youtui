'use client'
import { BookCore } from '@/components/tui/BookCore'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Book } from '@/types/tui'
import { BookSkeleton } from '@/components/tui/BookSkeleton'
import AppPagination from '@/components/tui/pagination/AppPagination'
import { getTuis } from '@/server/getTui'

export default function BookPage (): JSX.Element {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const tag = searchParams.get('tag') || ''
  const length = Number(searchParams.get('length')) || 0

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
        <AppPagination data={data.pagination} />
      </div>
    </>
  )
}
