import { TuiCommentT } from '../types/tui_comment'
export async function getTuiComment (
  page: number,
  limit: number,
  id: number
): Promise<TuiCommentT> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    let url = `http://localhost:3333/api/tuis/scrape-comments?${queryParams.toString()}`
    console.log(url)

    const res = await fetch(
      // `${process.env.API_URL}tuis/scrape-comments?${queryParams.toString()}`
      url,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      }
    )

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data
  } catch (error: any) {
    console.error('Failed to fetch book comments:', error)
    throw new Error(error.message || 'Something went wrong')
  }
}
