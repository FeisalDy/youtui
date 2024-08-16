'use client'
import { getBookListById } from '@/server/getBooklist'
import { useQuery } from '@tanstack/react-query'
import { BookListDataT } from '@/types/booklist'
import BookListCore from './BookListCore'
import { useSearchParams } from 'next/navigation'
import AppPagination from '@/components/tui/pagination/AppPagination'
import { useQueryParams } from '@/hooks/useQuery'
import { z } from 'zod'
import { useEffect } from 'react'

type IdT = {
  id: number
}

const queryParamSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional()
})

export default function ShowBookList ({ id }: IdT) {
  const { data, error, isLoading } = useQuery<BookListDataT>({
    queryKey: ['booklist', id],
    queryFn: () => getBookListById(id)
  })
  const searchParams = useSearchParams()
  const { queryParams, setQueryParams } = useQueryParams({
    schema: queryParamSchema,
    defaultValues: {}
  })

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page, limit])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  let dataLength = data?.data.length || 0

  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const currentPageData = data?.data.slice(startIndex, endIndex)
  const totalPages = Math.ceil(dataLength / limit)

  const pagination = {
    page,
    limit,
    totalCount: dataLength,
    totalPages
  }

  return (
    <article className='max-w-6xl mx-auto'>
      <div className='grid grid-flow-row auto-rows-max gap-y-6'>
        <h1 className='text-center text-2xl md:text-6xl'>{data?.title}</h1>
        {currentPageData?.map((item, index) => (
          <BookListCore key={index} name={item} />
        ))}
        <div className='flex justify-center'>
          <AppPagination data={pagination} setQueryParams={setQueryParams} />
        </div>
      </div>
    </article>
  )
}
