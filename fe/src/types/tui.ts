export type Book = {
  tag: string[]
  info: string
  cover: string
  score: string
  title: string
  book_id: number
  author_id: number
  source_name: string
  word_number: number
  process_name: string
  chapter_number: number
  author_nickname: string
  first_subscribe: string
  third_type_name: string
  second_type_name: string
  word_number_name: string
  score_people_number: number
}

export type Pagination = {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}

export type BookT = {
  data: Book[]
  pagination: Pagination
}
