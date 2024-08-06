'use client'
import { getDetailTui } from '@/server/getTui'
import { useQuery } from '@tanstack/react-query'
import { Book } from '@/types/tui'
import { BookCore } from '@/components/tui/BookCore'
import { BookSkeleton } from '@/components/tui/BookSkeleton'

type UniqueT = {
  name: string
}

export default function ShowBookList ({ name }: UniqueT) {
  const { isPending, isError, data, error } = useQuery<Book>({
    queryKey: ['tui', name],
    queryFn: () => getDetailTui(name)
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
      <BookCore item={data} />
    </>
  )
}
