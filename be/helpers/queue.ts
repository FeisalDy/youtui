import { scrapeBooklist } from './scrape_booklist.js'

class Queue {
  private jobs: any[] = []

  async add (job: any) {
    this.jobs.push(job)
    return this.jobs.length - 1
  }

  async process () {
    while (this.jobs.length > 0) {
      const job = this.jobs.shift()
      // Process the job here
      await scrapeBooklist(job.url)
    }
  }
}

export default Queue
