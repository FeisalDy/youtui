'use client'
import { BookCore } from '@/components/book/BookCore'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { BookWithComments } from '@/types/book'
import { BookDescription } from '@/components/book/BookDescription'
import { BookComment } from '@/components/book/BookComments'
import fetch from 'isomorphic-unfetch'

const getRandomBookId = (): number => {
  const totalBooks = 7100
  return Math.floor(Math.random() * totalBooks) + 1
}

export default function BookPage (): JSX.Element {
  const pathname = usePathname()
  const bookId = parseInt(pathname.split('/')[2])
  //   const bookId = getRandomBookId()

  const fetchBook = async (): Promise<BookWithComments> => {
    const response = await fetch(
      `http://localhost:3333/api/en-books/${bookId}?comments=true`
    )

    const data = response.json()
    return data
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: fetchBook
    // queryFn: async () => {
    //   const response = await fetch(
    //     `http://192.168.1.4:3333/api/en-books/${bookId}?comments=true`
    //   )
    //   return response.json()
    // }
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <BookCore item={data.book} />
      <div className='container max-w-6xl'>
        <div className='grid grid-flow-row auto-rows-max gap-y-4'>
          <BookDescription item={data.book} />
          <BookComment item={data.comments} />
        </div>
      </div>
    </>
  )
}
