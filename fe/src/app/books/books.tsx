'use client'
import { getBooks } from '@/server/getBooks'
import { useQuery } from '@tanstack/react-query'
import { Book, BookList } from '@/types/book'
import BookCard from '@/components/books/BookCard'
import Link from 'next/link'
import AppPagination from '@/components/pagination/AppPagination'

type BooksT = {
  page: number
}

export default function Books ({ page }: BooksT) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['books', page],
    queryFn: () => getBooks(page)
  })

  if (error) return { error }
  if (isLoading) return { isLoading }

  const { books, pagination } = data as BookList

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='grid grid-cols-2 gap-4 mx-4 lg:mx-0'>
        {books.map((book: Book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCard key={book.id} book={book} />
          </Link>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination data={pagination} />
      </div>
    </div>
  )
}
