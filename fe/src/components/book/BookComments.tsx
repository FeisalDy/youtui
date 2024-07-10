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
          formattedMessage = decodedMessage?.replace(/<br\/>/g, '\n') ?? '' // use nullish coalescing operator
        }

        return (
          <article
            key={comment.id}
            className={`p-4 rounded-lg bg-slate-100 dark:bg-[#161616] prose-md dark:prose-p:text-gray-400 prose-h3:font-bold max-w-prose sm:max-w-full`}
          >
            {/* <footer className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <p className='inline-flex items-center mr-3 prose-lg'>
                  {comment.username}
                </p>
              </div>
            </footer> */}
            <div className='grid grid-flow-row auto-rows-max gap-y-2'>
              <h3 className='first-letter:uppercase'>{comment.username}</h3>
              <p>
                {/* <p className='text-gray-500 dark:text-gray-400 normal-case'> */}
                {/* <div className='prose-sm prose-p:text-gray-400'> */}
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
