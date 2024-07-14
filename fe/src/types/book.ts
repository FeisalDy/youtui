export type Book = {
  id: number
  url: string
  name: string
  author: string
  category?: string
  length?: number
  rating_count?: number
  rating_avg?: number
  update_date?: Date
  cover_url?: string
  description?: string
}

export type Comment = {
  id: number
  comment_id: string
  username: string
  user_id?: number
  book_id?: number
  rate?: number
  message?: string
  starnum?: number
}

export type BookWithComments = {
  book: Book
  comments: Comment[]
}

export type BookList = {
  books: Book[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
  }
}
