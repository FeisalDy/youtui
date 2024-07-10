/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class BooksController {
  async index (ctx: HttpContext) {
    const page = ctx.params.page
    const books = await prisma.books.findMany({ skip: (page - 1) * 10, take: 10 })
    return ctx.response.json(books)
  }

  async show (ctx: HttpContext) {
    const id = ctx.params.id
    const book = await prisma.books.findUnique({ where: { id: Number(id) } })
    return ctx.response.json(book)
  }

  async search (ctx: HttpContext) {
    const name = ctx.params.name
    const searchQuery = decodeURIComponent(name)

    const books = await prisma.books.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { en_name: { contains: searchQuery, mode: 'insensitive' } },
          { author: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
    })

    return ctx.response.json(books)
  }
}
