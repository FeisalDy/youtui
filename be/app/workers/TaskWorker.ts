'use strict'

import Bull from 'bull'
import redisConfig from '../../config/redis.js'
import { scrapeBooklist } from '../../helpers/scrape_booklist.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class TaskWorker {
  private static instance: Bull.Queue

  static get queue (): Bull.Queue {
    if (!TaskWorker.instance) {
      TaskWorker.instance = new Bull('book-list', {
        redis: {
          host: redisConfig.connections.main.host,
          port: redisConfig.connections.main.port,
          password: redisConfig.connections.main.password,
          maxRetriesPerRequest: null, // Ensure that Redis does not exhaust all clients on retries
          enableReadyCheck: false, // Disable ready check for faster reconnects
        },
        defaultJobOptions: {
          attempts: 3, // Retry up to 3 times
          backoff: {
            type: 'exponential',
            delay: 5000, // Delay between retries (5 seconds)
          },
        },
      })
    }
    return TaskWorker.instance
  }

  static async handle (job: any) {
    try {
      const { url } = job.data

      const data = await scrapeBooklist(url)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.title === '' || data.data.length === 0) {
        throw new Error('Failed to scrape booklist')
      }

      const existingBooklist = await prisma.tui_booklist.findFirst({
        where: {
          title: data.title,
        },
      })

      if (existingBooklist) {
        return { code: 200, error: 'Booklist already exists' }
      }

      await prisma.tui_booklist.create({
        data: {
          title: data.title,
          data: data.data,
        },
      })
      return { code: 200, message: 'Booklist saved successfully' }
    } catch (error) {
      console.error(`Job failed: ${error.message}`)
      throw error
    }
  }
}

TaskWorker.queue.process(TaskWorker.handle)

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...')
  try {
    await TaskWorker.queue.pause()

    await TaskWorker.queue.close()

    await prisma.$disconnect()
  } catch (error) {
    console.error('Error during shutdown:', error)
  } finally {
    process.exit(0)
  }
})
