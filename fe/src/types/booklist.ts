export type BookListDataT = {
  id: number
  title: string
  data: []
}

export type BookListPaginationT = {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}

export type BookListT = {
  data: BookListDataT[]
  pagination: BookListPaginationT
}
