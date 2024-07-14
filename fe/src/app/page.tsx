import fetch from 'isomorphic-unfetch'
import { BookList, Book } from '@/types/book'
import BookCard from '@/components/books/BookCard'
import Link from 'next/link'

const fetchBook = async (page: number): Promise<BookList> => {
  const response = await fetch(
    process.env.API_URL + `en-books/list?page=${page}`
  )

  const data = response.json()
  return data
}
export default async function Home ({ searchParams }: any) {
  const page = parseInt(searchParams?.page) || 1

  const { books, pagination } = await fetchBook(page)

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='grid grid-cols-2 gap-4'>
        {books.map((book: Book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCard key={book.id} book={book} />
          </Link>
        ))}
      </div>
    </div>
  )
}
