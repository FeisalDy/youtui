import axios from 'axios'

export interface ScrapedDataT {
  code: number
  data?: Data
  message?: string
}

export interface Data {
  data: Daum[]
  total: number
}

export interface Daum {
  score_id: number
  book_id: number
  score: number
  content: string
  image: any[]
  like_number: number
  is_like: boolean
  reply_number: number
  coll_number: number
  is_coll: boolean
  create_time: string
  is_self: boolean
  user_id: number
  user: User
  post_list: any[]
}

export interface User {
  user_id: number
  nickname: string
  avatar: string
  user_exp_level_name: string
  user_exp_level: number
  follow_status: number
  avatar_frame_image: string
}

export async function scrapeComments (url: string, id: number): Promise<ScrapedDataT> {
  try {
    const res = await axios.get(url, { timeout: 5000 })

    if (res.status !== 200) {
      return {
        code: res.status,
        data: { data: [], total: 0 },
        message: 'Failed to scrape comments',
      }
    }
    const modifiedData = res.data.data.data.map((item: Daum) => ({
      ...item,
      book_id: id,
    }))

    return {
      code: res.data.code,
      data: {
        data: modifiedData,
        total: res.data.data.total,
      },
      message: res.data.message || '',
    }
  } catch (error) {
    return {
      code: 500,
      data: { data: [], total: 0 },
      message: error,
    }
  }
}
