'use client'
import { TuiCommentT } from '@/types/tui_comment'
import { decodeHTMLEntities } from '@/utils/decodeHTMLEntities'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { getTuiComment } from '@/server/getTuiComment'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '@/hooks/useQuery'
import { z } from 'zod'
import AppPagination from '@/components/tui/pagination/AppPagination'
import { useSearchParams } from 'next/navigation'

type BookCoreProps = {
  id: number
}

export function BookComment ({ id }: BookCoreProps) {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const { queryParams, setQueryParams } = useQueryParams({
    schema: z.object({
      page: z.number().optional(),
      limit: z.number().optional()
    }),
    defaultValues: {}
  })

  const { data, isError, isPending } = useQuery<TuiCommentT>({
    queryKey: ['tui', 'comment', id, page, limit],
    queryFn: () => getTuiComment(page, limit, id)
  })

  if (isPending) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return null
  }

  if (!data) {
    return null
  }

  return (
    <div className='space-y-4'>
      {data.data.map(comment => {
        let formattedMessage: string = ''
        if (comment.content) {
          const decodedMessage = decodeHTMLEntities(comment.content)
          formattedMessage = decodedMessage?.replace(/<br\/>/g, '\n') ?? ''
        }

        return (
          <article
            key={comment.score_id}
            className={`p-4 rounded-lg bg-slate-100 dark:bg-[#161616] prose-md dark:prose-p:text-gray-400 prose-h3:font-bold max-w-prose sm:max-w-full`}
          >
            <div className='grid grid-flow-row auto-rows-max gap-y-2'>
              <h3 className='first-letter:uppercase'>
                {comment.user.nickname}
              </h3>
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
      <div className='flex justify-center'>
        <AppPagination data={data.pagination} setQueryParams={setQueryParams} />
      </div>
    </div>
  )
}
