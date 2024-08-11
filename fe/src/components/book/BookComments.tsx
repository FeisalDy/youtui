import { Comment } from '@/types/book'
import Image from 'next/image'
import { decodeHTMLEntities } from '@/utils/decodeHTMLEntities'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

type BookCoreProps = {
  item: Comment[]
}
export function BookComment ({ item }: BookCoreProps) {
  return (
    <div className='space-y-4'>
      {item.map(comment => {
        let formattedMessage: string = ''
        if (comment.message) {
          const decodedMessage = decodeHTMLEntities(comment.message)
          formattedMessage = decodedMessage?.replace(/<br\/>/g, '\n') ?? ''
        }

        return (
          <article
            key={comment.id}
            className={`p-4 rounded-lg bg-slate-100 dark:bg-[#161616] prose-md dark:prose-p:text-gray-400 prose-h3:font-bold max-w-prose sm:max-w-full`}
          >
            <div className='grid grid-flow-row auto-rows-max gap-y-2'>
              <h3 className='first-letter:uppercase'>{comment.username}</h3>
              <p>
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  className='indent-0 first-letter:uppercase'
                >
                  {formattedMessage}
                </ReactMarkdown>
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
