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
    <div className='flex flex-col rounded-sm text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row'>
      <ImageWithFallback
        width={48}
        height={48}
        className='h-48 w-48 object-cover object-fit'
        src={imageUrl}
        fallbackSrc='/default_book.png'
        alt={book.description}
      />
      <div className='flex flex-col justify-start px-6'>
        <h5 className='mb-2 text-xl font-medium'>{book.name}</h5>
        <p className='mb-4 text-base'>
          {book.description && book.description.length > 100
            ? book.description.slice(0, 100) + '...'
            : book.description}
        </p>
        <p className='text-xs text-surface/75 dark:text-neutral-300'>
          Last updated 3 mins ago
        </p>
      </div>
    </div>
  )
}
