'use server'
import fetch from 'isomorphic-unfetch'

export async function postUrl (url: string) {
  try {
    console.log(url)
    const res = await fetch(process.env.API_URL + `tuis/scrape`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    })
    const data = await res.json()
    return data
  } catch (error: any) {
    return { error: error.message }
  }
}
