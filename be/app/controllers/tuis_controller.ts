/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
import { TaskWorker } from '../workers/TaskWorker.js'
import { CommentsWorker } from '../workers/CommentsWorker.js'
import { Daum, ScrapedDataT } from '../../helpers/scrape_comments.js'
import { scrapeComments } from '../../helpers/scrape_comments.js'
const prisma = new PrismaClient()

type TuiData = {
  data: {
    score_data?: unknown
    [key: string]: unknown
  }
}

type TagT = {
  tag: string
  tag_count: number
}

export default class TuisController {
  async tag_search (ctx: HttpContext) {
    const { page = 1, limit = 10 } = ctx.request.qs()
    const offset = (page - 1) * limit

    const countQuery = `
      WITH flattened_tags AS (
          SELECT DISTINCT jsonb_array_elements_text(data->'tag') AS tag
          FROM tui_json
      )
      SELECT COUNT(*) AS total_count FROM flattened_tags;
  `

    const totalCountResult = await prisma.$queryRawUnsafe<{ total_count: number }>(countQuery)
    const totalCount = totalCountResult?.total_count || 0
    const totalPages = Math.ceil(totalCount / limit)

    const dataQuery = `
      WITH flattened_tags AS (
          SELECT jsonb_array_elements_text(data->'tag') AS tag
          FROM tui_json
      )
      SELECT tag, COUNT(*) AS tag_count
      FROM flattened_tags
      GROUP BY tag
      ORDER BY tag_count DESC
      LIMIT ${limit}
      OFFSET ${offset};
  `

    const tags = await prisma.$queryRawUnsafe<TagT>(dataQuery)

    return ctx.response.json({
      status: '200',
      data: tags,
      pagination: {
        page,
        limit: limit,
        totalCount,
        totalPages,
      },
    })
  }

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
    // console.log(dataQuery)
    const totalCount = await prisma.$queryRawUnsafe<{ count: number }[]>(countQuery)
    const tuis = await prisma.$queryRawUnsafe<TuiData[]>(dataQuery)
    const responseData = tuis.map((tui) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { score_data, ...rest } = tui.data as Record<string, unknown>
      return rest
    })
    let totalCountValue = Number(totalCount[0].count)
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
      return ctx.response.status(200).json({ error: 'Book not found' })
    }
    return ctx.response.json(tui.data)
  }

  async index_booklist (ctx: HttpContext) {
    const bookListNameRaw = ctx.request.qs().bookListName || ''
    const limit = Number(ctx.request.qs().limit) || 10
    const page = Number(ctx.request.qs().page) || 1

    const bookListName = decodeURIComponent(bookListNameRaw)

    const skip = (page - 1) * limit
    let booklist = []
    let totalCount = 0

    if (bookListName) {
      totalCount = await prisma.tui_booklist.count({
        where: { title: { contains: bookListName } },
      })

      booklist = await prisma.tui_booklist.findMany({
        where: { title: { contains: bookListName } },
        skip,
        take: limit,
      })
    } else {
      totalCount = await prisma.tui_booklist.count()

      booklist = await prisma.tui_booklist.findMany({
        skip,
        take: limit,
      })
    }

    const totalPages = Math.ceil(totalCount / limit)
    return ctx.response.json({
      code: '200',
      data: booklist,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    })
  }

  async show_booklist (ctx: HttpContext) {
    const bookListId = ctx.params.id
    const booklist = await prisma.tui_booklist.findUnique({
      where: {
        id: Number(bookListId),
      },
    })
    return ctx.response.json({ code: 200, data: booklist })
  }

  async book_with_booklist (ctx: HttpContext) {
    let { page = 1, limit = 10, name } = ctx.request.qs()

    name = decodeURIComponent(name)
    limit = Number(limit)
    page = Number(page)

    // Ensure limit is not greater than 100
    if (limit > 100) {
      return ctx.response.json({ code: 200, error: 'Limit should be less than 100' })
    }

    const offset = (page - 1) * limit

    const dataQuery = `
      SELECT * FROM tui_booklist 
      WHERE data::jsonb ? '${name}' 
      ORDER BY id 
      LIMIT ${limit} OFFSET ${offset}
    `

    const countQuery = `
      SELECT COUNT(*) FROM tui_booklist 
      WHERE data::jsonb ? '${name}'
    `
    // console.log(dataQuery)
    // console.log(countQuery)

    try {
      // Execute the queries with parameterized inputs
      const data = await prisma.$queryRawUnsafe(dataQuery)
      const totalCountResult = (await prisma.$queryRawUnsafe(countQuery)) as { count: string }[]
      const totalCount = Number(totalCountResult[0].count)
      const totalPages = Math.ceil(totalCount / limit)

      return ctx.response.json({
        code: 200,
        data,
        Pagination: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      })
    } catch (error) {
      return ctx.response.json({ code: 200, error: 'An error occurred while fetching data' })
    }
  }

  async scrape_booklist (ctx: HttpContext) {
    try {
      const { url } = ctx.request.body()
      const job = await TaskWorker.queue.add({ url })
      const result = await job.finished()
      return ctx.response.json(result)
    } catch (error) {
      console.error('Error in scrape_booklist:', error)
      return ctx.response.json({ status: 200, error: 'Failed to process the booklist scraping' })
    }
  }

  async scrape_comments (ctx: HttpContext) {
    let { id } = ctx.request.body()
    let { page = 1, limit = 10 } = ctx.request.qs()
    limit = Number(limit)
    page = Number(page)
    id = Number(id)

    if (limit > 100) {
      return ctx.response.json({ code: 200, error: 'Limit should be less than 100' })
    }

    const offset = (page - 1) * limit

    const url = (page: number, limit: number) =>
      `https://pre-api.tuishujun.com/api/listBookScoreByBook?book_id=${id}&type=all&page=${page}&pageSize=${limit}&sort_field=create_time&sort_value=desc`

    // const realTotal = await fetch(url(1, 1))
    //   .then((res) => res.json())
    //   .then((data) => (data as ScrapedDataT).data?.total || 0)

    // const realTotalDB = await prisma.tui_booklist.count({})
    const totalCount = await prisma.tui_comment.count({
      where: { book_id: id },
    })

    const data = await prisma.tui_comment.findMany({
      where: { book_id: id },
      skip: offset,
      take: limit,
    })
    const totalPages = Math.ceil(totalCount / limit)

    if (totalCount > 0) {
      return ctx.response.json({
        status: 200,
        data,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      })
    }

    // if (data.length < realTotal) {
    try {
      let allComments: Daum[] = []
      let page = 1
      let total = 0

      do {
        const result = await scrapeComments(url(page, 2000), id)

        if (result.code !== 200) {
          return ctx.response.json({ status: 200, error: 'Failed to scrape comments' })
        }

        const comments = result.data?.data || []
        total = result.data?.total || 0

        if (comments.length === 0) {
          return ctx.response.json({ status: 200, error: 'No comments found' })
        }

        if (comments.length > 0) {
          allComments = [...allComments, ...comments]
        } else {
          break
        }
        page++
        console.log('Total:', total, 'Current:', allComments.length)
      } while (allComments.length < total)

      CommentsWorker.queue.add({ data: allComments })
      allComments = allComments.slice(0, limit)
      return ctx.response.json({ status: 200, data: allComments })
    } catch (error) {}
    // }
  }
}
