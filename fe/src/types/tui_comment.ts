export interface TuiCommentT {
  status: number
  data: Daum[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
  }
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

export type User = {
  user_id: number
  nickname: string
  avatar: string
}
