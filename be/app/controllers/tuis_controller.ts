/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type TuiData = {
  data: {
    score_data?: unknown
    [key: string]: unknown
  }
}

export default class TuisController {
  async index (ctx: HttpContext) {
    const page = Number(ctx.request.qs().page) || 1
    const limit = Number(ctx.request.qs().limit) || 10
    const tag = ctx.request.qs().tag
    const searchQuery = tag ? decodeURIComponent(tag) : null
    const length = ctx.request.qs().length || 0

    let countQuery = `SELECT COUNT(*) FROM tui_json`
    let dataQuery = `SELECT * FROM tui_json`

    if (searchQuery) {
      countQuery += ` WHERE data-> 'tag' ? '${searchQuery}' AND (data-> 'word_number')::int >= ${length}`
      dataQuery += ` WHERE data-> 'tag' ? '${searchQuery}' AND (data-> 'word_number')::int >= ${length}`
    }
    dataQuery += ` ORDER BY id LIMIT ${limit} OFFSET ${(page - 1) * limit}`

    console.log(dataQuery)

    const totalCount = await prisma.$queryRawUnsafe<{ count: number }[]>(countQuery)
    const tuis = await prisma.$queryRawUnsafe<TuiData[]>(dataQuery)

    const responseData = tuis.map((tui) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { score_data, ...rest } = tui.data as Record<string, unknown>
      return rest
    })

    let totalCountValue = Number(totalCount[0].count)
    console.log(typeof totalCountValue)
    return ctx.response.json({
      data: responseData,
      pagination: {
        page,
        limit,
        totalCount: totalCountValue,
        totalPages: Math.ceil(totalCountValue / limit),
      },
    })
  }

  async show (ctx: HttpContext) {
    const uniqueBook = ctx.params.uniquebook
    const searchQuery = decodeURIComponent(uniqueBook)

    const tui = await prisma.tui_json.findFirst({
      //   where: {
      //     OR: [
      //       { data: { path: ['book_id'], equals: Number(searchQuery) } },
      //       { data: { path: ['title'], equals: searchQuery } },
      //     ],
      //   },
      where: {
        AND: [
          {
            OR: [
              { data: { path: ['book_id'], equals: Number(searchQuery) } },
              { data: { path: ['title'], equals: searchQuery } },
            ],
          },
          { data: { path: ['word_number'], gt: 500000 } },
        ],
      },
    })
    if (!tui) {
      return ctx.response.status(404).json({ message: 'Not Found' })
    }
    return ctx.response.json(tui.data)
  }
}
