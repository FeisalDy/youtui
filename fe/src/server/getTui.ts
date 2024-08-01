'use server'
import fetch from 'isomorphic-unfetch'
import { BookT } from '@/types/tui'

export async function getTuis (
  page: number,
  tag: string,
  limit: number,
  length: number
): Promise<BookT> {
  try {
    const res = await fetch(
      process.env.API_URL +
        `tuis/list?tag=${tag}&page=${page}&limit=${limit}&length=${length}`
    )
    const data = res.json()
    return data
  } catch (error: any) {
    return error
  }
}
