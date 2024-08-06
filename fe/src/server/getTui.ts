'use server'
import fetch from 'isomorphic-unfetch'
import { BookT } from '@/types/tui'

export async function getTuis (
  page?: number,
  tag?: string,
  limit?: number,
  length?: number
): Promise<BookT> {
  try {
    const queryParams = new URLSearchParams()

    if (tag) queryParams.append('tag', tag)
    if (page) queryParams.append('page', page.toString())
    if (limit) queryParams.append('limit', limit.toString())
    if (length) queryParams.append('length', length.toString())

    const res = await fetch(
      `${process.env.API_URL}tuis/list?${queryParams.toString()}`
    )
    const data = res.json()
    return data
  } catch (error: any) {
    return error
  }
}

export async function getDetailTui (unique: number | string) {
  try {
    const res = await fetch(`${process.env.API_URL}tuis/${unique}`)
    const data = res.json()
    return data
  } catch (error: any) {
    return error
  }
}
