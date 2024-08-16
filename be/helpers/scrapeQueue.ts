import { Queue, Worker, QueueScheduler } from 'bullmq'
import { redis } from '@adonisjs/core/build/standalone'

// Create a Redis connection
const redisClient = redis.createClient()

// Initialize a queue
export const scrapeQueue = new Queue('scrapeQueue', {
  connection: redisClient,
})

// Initialize a worker
export const scrapeWorker = new Worker(
  'scrapeQueue',
  async (job) => {
    // Define your scraping logic here
    const { url } = job.data
    const data = await scrapeBooklist(url)

    // Save data to the database
    await prisma.tui_booklist.create({ data })

    return data
  },
  {
    connection: redisClient,
  }
)

// Optionally add a queue scheduler for handling delayed jobs or retries
new QueueScheduler('scrapeQueue', { connection: redisClient })
