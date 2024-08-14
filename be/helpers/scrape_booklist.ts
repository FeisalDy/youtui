//create helper function to scrape booklist from url
import axios from 'axios'
import * as cheerio from 'cheerio'
import string from '@adonisjs/core/helpers/string'

type ScrapedDataT = {
  title: string
  data: string[]
  error?: string
}
//eslint-disable-next-line
export async function scrapeBooklist(url: string): Promise<ScrapedDataT> {
  try {
    const res = await axios.get(url)
    console.log(url)

    if (res.status !== 200) {
      return { error: 'Failed to retrieve web page', title: '', data: [] }
    }

    const $ = cheerio.load(res.data)
    let filename = ''

    const metaDescription = $('meta[name="description"]').attr('content')
    if (metaDescription) {
      const rawfilename = metaDescription.split(' ')[0]
      filename = string.create(rawfilename).removeSuffix('_笔趣阁5200').toString()
    } else {
      filename = string.random(32)
    }

    const titles: string[] = []

    $('dt, span[title]').each((index, element) => {
      const el = $(element)
      if (el.is('dt') && el.text() === '随机推荐') {
        console.log("Reached <dt> tag with text '随机推荐'. Stopping the script.")
        return false
      }

      const title = el.attr('title')
      if (el.is('span') && title) {
        titles.push(title)
      }
    })

    let data: ScrapedDataT = { title: filename, data: [] }

    if (titles.length > 0) {
      data = {
        title: filename,
        data: titles,
      }
    }

    return data
  } catch (error) {
    return { error: error, title: '', data: [] }
  }
}
