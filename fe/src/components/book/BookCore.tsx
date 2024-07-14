import { Book } from '@/types/book'
import Image from 'next/image'
import Link from 'next/link'

type BookCoreProps = {
  item: Book
}

export function BookCore ({ item }: BookCoreProps) {
  const renderStars = (rating: number) => {
    const stars = []
    const rating_value = Math.floor(rating / 2)

    if (rating_value === 0) stars.push(<p>No rating</p>)

    for (let i = 0; i < rating_value; i++) {
      stars.push(
        <svg
          className='w-4 h-4 text-yellow-300 me-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 22 20'
        >
          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
        </svg>
      )
    }
    return stars
  }
  const imageUrl = item?.cover_url?.startsWith('http' || 'https')
    ? item.cover_url
    : '/default_book.png'

  return (
    <div className='bg-slate-100 dark:bg-[#161616] w-full'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-rows-1 grid-cols-5 sm:grid-cols-6 grid-flow-col gap-4'>
          <div className='row-span-1 col-span-2 sm:col-span-2'>
            <Link href={item.url} target='_blank' rel='noopener noreferrer'>
              <Image
                src={imageUrl}
                alt={item.name}
                width={400}
                height={600}
                className='rounded-md m-4'
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsamiqBwAFFQIFTZQjUQAAAABJRU5ErkJggg=='
              />
            </Link>
          </div>
          <div className='col-span-3 sm:col-span-4 m-4'>
            <Link href={item.url}>
              <h1 className='md:text-4xl text-md font-bold capitalize'>
                {item.name}
              </h1>
            </Link>
            <p className='text-xs md:text-xl text-transform: capitalize'>
              Author: {item.author}
            </p>
            <p className='text-xs md:text-xl text-transform: capitalize'>
              Word Count: {item.length}
            </p>

            <div className='flex items-center'>
              {renderStars(item.rating_avg || 0)}
              <p className='ms-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                {(item.rating_avg ?? 0) / 2}
              </p>
            </div>

            <Link href={`/books/${item.id + 1}`}>
              <button
                type='button'
                className='inline-flex items-center px-2 py-1 md:px-5 md:py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4'
              >
                {item.category ?? 'Other'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
