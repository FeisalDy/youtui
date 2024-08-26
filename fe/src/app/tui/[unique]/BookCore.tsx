'use client'
import { getDetailTui } from '@/server/getTui'
import { useQuery } from '@tanstack/react-query'
import { Book } from '@/types/tui'
import { BookSkeleton } from '@/components/tui/BookSkeleton'
import { BookCore as BC } from '@/components/tui/BookCore'
import { BooksBooklists } from '@/components/tui/BooksBooklists'
import { BookComment } from '@/components/tui/BookComments'

export default function BookCore ({ unique }: { unique: string | number }) {
  const { data, isError, isPending } = useQuery<Book>({
    queryKey: ['tui', 'book', unique],
    queryFn: () => getDetailTui(unique)
  })

  if (isPending) {
    return <BookSkeleton />
  }

  if (isError) {
    return null
  }

  if (!data || data.error) {
    return null
  }

  return (
    <>
      <BC item={data} />
      <div className='container max-w-6xl'>
        <BookComment id={data.book_id} />
        <div className='grid grid-flow-row auto-rows-max gap-y-4'>
          {/* <BooksBooklists item={data.title} /> */}
        </div>
      </div>
    </>
  )
}
