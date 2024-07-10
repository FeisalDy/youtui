/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class TuisController {
  async index (ctx: HttpContext) {
    const page = Number(ctx.request.qs().page) || 1
    const limit = Number(ctx.request.qs().limit) || 10
    const tag = ctx.request.qs().tag
    const searchQuery = decodeURIComponent(tag)

    const tuis = await prisma.tui_json.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: { data: { path: ['tag'], array_contains: searchQuery } },
    })
    const responseData = tuis.map((tui) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { score_data, ...rest } = tui.data as Record<string, unknown>
      return rest
    })
    return ctx.response.json(responseData)
  }

  async show (ctx: HttpContext) {
    const uniqueBook = ctx.params.uniquebook
    const searchQuery = decodeURIComponent(uniqueBook)

    const tui = await prisma.tui_json.findFirst({
      where: {
        OR: [
          { data: { path: ['book_id'], equals: Number(searchQuery) } },
          { data: { path: ['title'], equals: searchQuery } },
        ],
      },
    })
    if (!tui) {
      return ctx.response.status(404).json({ message: 'Not Found' })
    }
    return ctx.response.json(tui.data)
  }
}
