'use strict'

import Bull from 'bull'
import redisConfig from '../../config/redis.js'
import { Daum } from '../../helpers/scrape_comments.js'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export class CommentsWorker {
  private static instance: Bull.Queue

  static get queue (): Bull.Queue {
    if (!CommentsWorker.instance) {
      CommentsWorker.instance = new Bull('tui-comments', {
        redis: {
          host: redisConfig.connections.main.host,
          port: redisConfig.connections.main.port,
          password: redisConfig.connections.main.password,
          maxRetriesPerRequest: null,
          enableReadyCheck: false,
        },
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
        },
      })
    }
    return CommentsWorker.instance
  }
  static async handle (job: any) {
    try {
      const { data } = job.data
      let allComments: Daum[] = data

      //   await prisma.tui_comment.createMany({
      //     data: allComments.map((comment) => ({
      //       book_id: comment.book_id,
      //       score_id: comment.score_id,
      //       score: comment.score,
      //       content: comment.content,
      //       like_number: comment.like_number,
      //       is_like: comment.is_like,
      //       reply_number: comment.reply_number,
      //       coll_number: comment.coll_number,
      //       is_coll: comment.is_coll,
      //       create_time: new Date(comment.create_time),
      //       is_self: comment.is_self,
      //       user_id: comment.user_id,
      //       user: comment.user as unknown as Prisma.JsonObject,
      //     })),
      //     skipDuplicates: false,
      //   })

      for (const comment of allComments) {
        let retryCount = 0
        const maxRetries = 5
        let success = false

        while (!success && retryCount < maxRetries) {
          try {
            const existingComment = await prisma.tui_comment.findFirst({
              where: {
                score_id: comment.score_id,
                book_id: comment.book_id,
                content: comment.content,
                user_id: comment.user_id,
              },
            })

            if (existingComment) {
              console.log('existingComment:', existingComment)
              console.log('Comment already exists, skipping:', comment.score_id)
              success = true
              break
            }

            await prisma.tui_comment.create({
              data: {
                book_id: comment.book_id,
                score_id: comment.score_id,
                score: comment.score,
                content: comment.content,
                like_number: comment.like_number,
                is_like: comment.is_like,
                reply_number: comment.reply_number,
                coll_number: comment.coll_number,
                is_coll: comment.is_coll,
                create_time: new Date(comment.create_time),
                is_self: comment.is_self,
                user_id: comment.user_id,
                user: comment.user as unknown as Prisma.JsonObject,
              },
            })
            success = true
          } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
              // If unique constraint error, randomize score_id and retry
              comment.score_id = Math.floor(Math.random() * 1000000)
              retryCount++
              if (retryCount >= maxRetries) {
                console.error('Failed to insert comment after several retries:', comment, error)
                throw error
              }
            } else {
              // Handle other errors
              console.error('Error inserting comment:', comment, error)
              throw error
            }
          }
        }
      }
    } catch (error) {
      console.error(`Job failed: ${error.message}`)
      throw error
    }
  }
  //   static async handle (job: any) {
  //     try {
  //       const { data } = job.data
  //       let allComments: Daum[] = data

  //       for (const comment of allComments) {
  //         let retryCount = 0
  //         const maxRetries = 5
  //         let success = false

  //         while (!success && retryCount < maxRetries) {
  //           try {
  //             await prisma.tui_comment.create({
  //               data: {
  //                 book_id: comment.book_id,
  //                 score_id: comment.score_id,
  //                 score: comment.score,
  //                 content: comment.content,
  //                 like_number: comment.like_number,
  //                 is_like: comment.is_like,
  //                 reply_number: comment.reply_number,
  //                 coll_number: comment.coll_number,
  //                 is_coll: comment.is_coll,
  //                 create_time: new Date(comment.create_time),
  //                 is_self: comment.is_self,
  //                 user_id: comment.user_id,
  //                 user: comment.user as unknown as Prisma.JsonObject,
  //               },
  //             })
  //             success = true
  //           } catch (error) {
  //             if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
  //               comment.score_id = Math.floor(Math.random() * 1000000)
  //               retryCount++
  //               if (retryCount >= maxRetries) {
  //                 console.error('Failed to insert comment after several retries:', comment, error)
  //                 throw error
  //               }
  //             } else {
  //               // Handle other errors
  //               console.error('Error inserting comment:', comment, error)
  //               throw error
  //             }
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error(`Job failed: ${error.message}`)
  //       throw error
  //     }
  //   }
}

CommentsWorker.queue.process(CommentsWorker.handle)

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...')
  try {
    await CommentsWorker.queue.pause()

    await CommentsWorker.queue.close()

    await prisma.$disconnect()
  } catch (error) {
    console.error('Error during shutdown:', error)
  } finally {
    process.exit(0)
  }
})
