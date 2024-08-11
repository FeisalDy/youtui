'use server'
import fetch from 'isomorphic-unfetch'
import { BookListT, BookListDataT } from '@/types/booklist'

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

export async function getBookListById (id: number): Promise<BookListDataT> {
  try {
    const res = await fetch(`${process.env.API_URL}tuis/booklist/${id}`)
    const data = await res.json()
    return data.data
  } catch (error: any) {
    throw error
  }
}

// export async function getBooksBooklists (
//   name: string
//   //   params: GetBookListParams
// ): Promise<BookListDataT> {
//   try {
//     const queryParams = new URLSearchParams()
//     // if (params.page) queryParams.append('page', params.page.toString())
//     // if (params.limit) queryParams.append('limit', params.limit.toString())

//     const res = await fetch(
//       `${
//         process.env.API_URL
//       }tuis/booklist/book?name=${name}&${queryParams.toString()}`
//     )
//     const data = await res.json()
//     return data.data
//   } catch (error: any) {
//     throw error
//   }
// }

export async function getBooksBooklists (name: string): Promise<BookListT> {
  try {
    const queryParams = new URLSearchParams({
      name: encodeURIComponent(name)
    })

    const res = await fetch(
      `${process.env.API_URL}tuis/booklist/book?${queryParams.toString()}`
    )

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data
  } catch (error: any) {
    console.error('Failed to fetch book lists:', error)
    throw new Error(error.message || 'Something went wrong')
  }
}
