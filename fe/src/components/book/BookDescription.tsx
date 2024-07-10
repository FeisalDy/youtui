import { Book } from '@/types/book'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { decodeHTMLEntities } from '@/utils/decodeHTMLEntities'

type BookCoreProps = {
  item: Book
}

export function BookDescription ({ item }: BookCoreProps) {
  if (!item.description) {
    return (
      <div className='bg-slate-100 dark:bg-transparent rounded-lg'>
        <div className='prose-xl rounded-md p-4'>
          <p>Description: </p>
          <p>No description available.</p>
        </div>
      </div>
    )
  }

  const decodedDescription = decodeHTMLEntities(item.description)
  //   const formattedDescription = decodedDescription?.replace(/<br\/>/g, '\n')
  const formattedDescription = decodedDescription?.replace(
    /(depth|analyzes |in-depth|complains| [^\.]*)\. */g,
    '$1.\n\n'
  )

  return (
    <div className='bg-transparent rounded-lg'>
      <div className='prose-sm md:prose-xl rounded-md p-4'>
        <p>Description: </p>

        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          //   className='indent-4 md:indent-8'
        >
          {formattedDescription}
        </ReactMarkdown>
      </div>
    </div>
  )
}
