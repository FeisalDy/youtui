/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class CommentsController {
  async index (ctx: HttpContext) {
    const bookId = Number.parseInt(ctx.params.id)
    const page = 10
    const comments = await prisma.comments.findMany({
      where: { book_id: bookId },
      skip: (page - 1) * 10,
      take: 10,
    })
    return ctx.response.json(comments)
  }

  async en_index (ctx: HttpContext) {
    const bookId = Number.parseInt(ctx.params.id)
    const page = 10
    const comments = await prisma.en_comments.findMany({
      where: { book_id: bookId },
      skip: (page - 1) * 10,
      take: 10,
    })
    return ctx.response.json(comments)
  }

  async en_list (ctx: HttpContext) {
    const comments = await prisma.en_comments.findFirst({
      include: { book: true },
    })
    return ctx.response.json(comments)
  }

  async show (ctx: HttpContext) {
    const message = ctx.params.message
    const searchQuery = decodeURIComponent(message)
    const searchWords = searchQuery.split(' ')

    const comment = await prisma.en_comments.findMany({
      where: {
        AND: searchWords.map((word) => ({
          message: { contains: word, mode: 'insensitive' },
        })),
      },
      orderBy: { id: 'asc' },
    })

    return ctx.response.json(comment)
  }
}
