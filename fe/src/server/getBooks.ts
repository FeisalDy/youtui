'use server'
import { BookList } from '@/types/book'
import fetch from 'isomorphic-unfetch'

export async function getBooks (page: number): Promise<BookList> {
  try {
    const res = await fetch(process.env.API_URL + `en-books/list?page=${page}`)
    const data = res.json()
    return data
  } catch (error: any) {
    return error
  }
}
