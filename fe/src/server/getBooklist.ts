'use server'
import fetch from 'isomorphic-unfetch'
import { BookListT } from '@/types/booklist'

interface GetBookListParams {
  bookListName?: string
  page?: number
  limit?: number
}

export async function getBookList (
  params: GetBookListParams = {}
): Promise<BookListT> {
  try {
    const queryParams = new URLSearchParams()
    if (params.bookListName)
      queryParams.append('bookListName', params.bookListName)
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())

    const res = await fetch(
      `${process.env.API_URL}tuis/booklist?${queryParams.toString()}`
    )
    const data = await res.json()
    return data
  } catch (error: any) {
    throw error
  }
}
