'use client'
import { Book } from '@/types/book'
import ImageWithFallback from '@/components/ImageWithFallback '

type BookCardProp = {
  book: Book
}

export default function BookCard ({ book }: BookCardProp) {
  const imageUrl =
    book?.cover_url?.startsWith('http') || book?.cover_url?.startsWith('https')
      ? book.cover_url
      : '/default_book.png'

  return (
    <div className='flex flex-col rounded-sm dark:text-white md:max-w-xl md:flex-row '>
      <div className='relative w-full md:max-w-36 aspect-[45/60]'>
        <ImageWithFallback
          fill
          className='object-cover'
          src={imageUrl}
          fallbackSrc='/default_book.png'
          alt={book.description}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsamiqBwAFFQIFTZQjUQAAAABJRU5ErkJggg=='
        />
      </div>
      <div className='flex flex-col justify-start md:px-6'>
        <h5 className='mb-2 text-2xl font-medium'>{book.name}</h5>
        <p className='mb-4 text-sm'>
          {book.description && book.description.length > 100
            ? book.description.slice(0, 100) + '...'
            : book.description}
          {!book.description && 'No description'}
        </p>
        {/* <p className='hidden md:block text-xs text-surface/75 dark:text-neutral-300'>
          Last updated 3 mins ago
        </p> */}
      </div>
    </div>
  )
}
