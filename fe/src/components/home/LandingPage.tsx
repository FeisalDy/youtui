'use client'
import { getBooks } from '@/server/getBooks'
import { useQuery } from '@tanstack/react-query'
import { Book, BookList } from '@/types/book'
import ImageWithFallback from '@/components/ImageWithFallback '
import Link from 'next/link'

export default function LandingPage () {
  const { data, error, isLoading } = useQuery({
    queryKey: ['book'],
    queryFn: () => getBooks(2)
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const { books } = data as BookList
  const newData = books.slice(0, 9)

  return (
    <>
      <div className='mx-1 lg:prose-lg text-center min-h-96 flex items-center'>
        <h1 className='dark: text-white'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          dolore magni fugiat blanditiis, soluta veniam omnis possimus!
          Similique excepturi libero accusantium dolores iure asperiores nisi
          reiciendis aspernatur. Praesentium, quod obcaecati?
        </h1>
      </div>
      <div className='grid grid-cols-3 gap-1 md:gap-4 mx-1 md:mx-4 lg:mx-0 '>
        {newData.map((book: Book) => (
          <div
            key={book.id}
            className='hover:scale-110 transition-transform duration-300 transform-gpu'
          >
            <Link href={`/books/${book.id}`}>
              <div className='relative w-full aspect-[1/1] '>
                <ImageWithFallback
                  fill
                  className='object-contain rounded-md'
                  src={book.cover_url}
                  fallbackSrc='/default_book.png'
                  alt={book.description}
                  //   placeholder='blur'
                  //   blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsamiqBwAFFQIFTZQjUQAAAABJRU5ErkJggg=='
                />
              </div>
              <div className='my-4 mx-1 md:m-4 text-center'>
                <h2 className='text-xs md:text-lg font-semibold'>
                  {book.name}
                </h2>
                <p className='text-xs md:text-sm'>{book.author}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
