import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
import { parseNumber, isValidSearchTarget, isValidLanguage } from '../../helpers/cecker.js'

const prisma = new PrismaClient()

export default class PixivsController {
  /**
   * Display a list of resource
   */
  async index (ctx: HttpContext) {
    let { page, limit, keyword, searchTarget = '', sort = 'desc', lang = 'all' } = ctx.request.qs()
    if (limit > 1000) {
      return ctx.response.json({
        error: 'Invalid limit',
        message: 'Limit must be less than or equal to 1000',
      })
    }

    if (!isValidSearchTarget(searchTarget)) {
      return ctx.response.json({
        error: 'Invalid search target',
        message:
          'Search target must be one of the following: "partial_match_for_tags", "exact_match_for_tags", "title_and_caption", "keyword"',
      })
    }

    if (!isValidLanguage(lang)) {
      return ctx.response.json({
        error: 'Invalid language',
        message: 'Language must be one of the following: "ja", "ch", "en", "all"',
      })
    }

    page = parseNumber(page, 1)
    limit = parseNumber(limit, 10)

    let keywords = Array.isArray(keyword) ? keyword : [keyword]
    keywords = keywords.flatMap((kw) => kw.split(',').map(decodeURIComponent))
    const keyWordsSet = `{${keywords.map((kw) => `"${kw}"`).join(',')}}`

    const langQuery = lang === 'all' ? null : `data->>'lang' = '${lang}'`

    let data = []
    let totalCount = 0

    if (searchTarget === '') {
      const dataQuery = `SELECT data FROM pixiv_json WHERE ${
        langQuery ? `${langQuery}` : ''
      } AND data->>'title' like '%${keyword}%' or data->>'content' like '%${keyword}%'  ORDER BY data->>'create' ${sort} LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`.trim()

      const totalQuery = `SELECT count(*) FROM pixiv_json where ${
        langQuery ? `${langQuery}` : ''
      } AND data->>'title' like '%${keyword}%' or data->>'content' like '%${keyword}%' `.trim()

      const totalCountValue = await prisma.$queryRawUnsafe<{ count: number }[]>(totalQuery)
      const results = (await prisma.$queryRawUnsafe(dataQuery)) as Array<{ data: any }>

      data = results.map((result) => this.convertTimestamps(result.data))
      totalCount = Number(totalCountValue[0].count)
    }

    if (searchTarget === 'exact_match_for_tags') {
      const dataQuery = `
          SELECT data 
          FROM pixiv_json 
          WHERE data->'tags' ?& '${keyWordsSet}' 
          ${langQuery ? `AND ${langQuery}` : ''}
          ORDER BY data->>'create' ${sort}
          LIMIT ${limit}
          OFFSET ${(page - 1) * limit}
        `.trim()

      const totalQuery = `
          SELECT count(*)
          FROM pixiv_json
          WHERE data->'tags' ?& '${keyWordsSet}' 
          ${langQuery ? `AND ${langQuery}` : ''}
        `.trim()

      const totalCountValue = await prisma.$queryRawUnsafe<{ count: number }[]>(totalQuery)
      const results = (await prisma.$queryRawUnsafe(dataQuery)) as Array<{ data: any }>

      data = results.map((result) => this.convertTimestamps(result.data))
      totalCount = Number(totalCountValue[0].count)
    }

    if (searchTarget === 'partial_match_for_tags') {
      const dataQuery = `
          SELECT data 
          FROM pixiv_json 
          WHERE data->>'tags' LIKE '%${keyword}%' 
          ${lang !== 'all' ? `AND data->>'lang' = '${lang}'` : ''}
          ORDER BY data->>'create' ${sort}
          LIMIT ${limit} 
          OFFSET ${(page - 1) * limit}
        `.trim()

      const totalQuery = `
          SELECT count(*)
          FROM pixiv_json
          WHERE data->>'tags' LIKE '%${keyword}%' 
          ${lang !== 'all' ? `AND data->>'lang' = '${lang}'` : ''}
        `.trim()

      const totalCountValue = await prisma.$queryRawUnsafe<{ count: number }[]>(totalQuery)
      const results = (await prisma.$queryRawUnsafe(dataQuery)) as Array<{ data: any }>

      data = results.map((result) => this.convertTimestamps(result.data))
      totalCount = Number(totalCountValue[0].count)
    }

    const totalPages = Math.ceil(totalCount / limit)

    return ctx.response.json({
      data,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    })
  }

  //   /**
  //    * Display form to create a new record
  //    */
  //   async create ({}: HttpContext) {}

  //   /**
  //    * Handle form submission for the create action
  //    */
  //   async store ({ request }: HttpContext) {}

  //   /**
  //    * Show individual record
  //    */
  //   async show ({ params }: HttpContext) {}

  //   /**
  //    * Edit individual record
  //    */
  //   async edit ({ params }: HttpContext) {}

  //   /**
  //    * Handle form submission for the edit action
  //    */
  //   async update ({ params, request }: HttpContext) {}

  //   /**
  //    * Delete record
  //    */
  //   async destroy ({ params }: HttpContext) {}
  private convertTimestamps (data: any) {
    if (data.create) {
      data.create = new Date(Number(data.create) * 1000).toISOString()
    }
    if (data.upload) {
      data.upload = new Date(Number(data.upload) * 1000).toISOString()
    }
    return data
  }
}
