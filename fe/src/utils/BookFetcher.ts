import fetch from 'isomorphic-unfetch'

export async function fetchBooks (data: string[]): Promise<any[]> {
  const res = await Promise.all(
    data.map(async book => {
      const res = await fetch(
        `${process.env.API_URL}tuis/${encodeURIComponent(book)}`
      )
      if (!res.ok) {
        throw new Error(`Failed to fetch data for book: ${book}`)
      }
      return res.json()
    })
  )
  return res
}
