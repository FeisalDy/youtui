/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default class EnBooksController {
  async index (ctx: HttpContext) {
    const page = Number(ctx.request.qs().page) || 1
    const limit = Number(ctx.request.qs().limit) || 10

    const totalCount = await prisma.en_books.count()
    const totalPages = Math.ceil(totalCount / limit)

    const books = await prisma.en_books.findMany({ skip: (page - 1) * limit, take: limit })
    if (books.length === 0) {
      return ctx.response.status(404).json({ message: 'Books not found' })
    }

    const pagination = {
      page,
      limit,
      totalCount,
      totalPages,
    }

    return ctx.response.json({ books, pagination })
  }

  async show (ctx: HttpContext) {
    const id = ctx.params.id
    const comments = ctx.request.qs().comments

    const book = await prisma.en_books.findUnique({ where: { id: Number(id) } })
    if (book === null) {
      return ctx.response.status(404).json({ message: 'Book not found' })
    }

    if (comments === 'true' && book && book.url) {
      const url = new URL(book.url)
      const bookId = url.pathname.split('/').pop()

      const bookComments = await prisma.en_comments.findMany({
        where: { book_id: Number(bookId) },
      })

      bookComments.sort((a, b) => {
        const aLength = a.message ? a.message.length : 0
        const bLength = b.message ? b.message.length : 0
        return bLength - aLength
      })

      return ctx.response.json({ book, comments: bookComments })
    }
    return ctx.response.json(book)
  }

  async search (ctx: HttpContext) {
    const name = ctx.params.name
    const searchQuery = decodeURIComponent(name)

    const books = await prisma.en_books.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { cn_name: { contains: searchQuery, mode: 'insensitive' } },
          { author: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
    })

    return ctx.response.json(books)
  }

  async des_search (ctx: HttpContext) {
    const description = ctx.params.description
    const searchQuery = decodeURIComponent(description)

    const books = await prisma.en_books.findMany({
      where: {
        OR: [{ description: { contains: searchQuery, mode: 'insensitive' } }],
      },
    })

    return ctx.response.json(books)
  }
}
