'use client'
import { getBookListById } from '@/server/getBooklist'
import { useQuery } from '@tanstack/react-query'
import { BookListDataT } from '@/types/booklist'
import BookListCore from './BookListCore'

type IdT = {
  id: number
}

export default function ShowBookList ({ id }: IdT) {
  const { data, error, isLoading } = useQuery<BookListDataT>({
    queryKey: ['booklist', id],
    queryFn: () => getBookListById(id)
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <article className='max-w-6xl mx-auto'>
      <div className='grid grid-flow-row auto-rows-max gap-y-6'>
        <h1 className='text-center text-2xl md:text-6xl'>{data?.title}</h1>
        {data?.data.map((item, index) => (
          <BookListCore key={index} name={item} />
        ))}
      </div>
    </article>
  )
}
