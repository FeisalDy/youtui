'use client'
import { BookListT } from '@/types/booklist'
import { useQuery } from '@tanstack/react-query'
import { getBooksBooklists } from '@/server/getBooklist'
import { Skeleton } from '@nextui-org/skeleton'
import Link from 'next/link'

export function BooksBooklists ({ item }: { item: string }) {
  const { data, isError, isLoading } = useQuery<BookListT>({
    queryKey: ['booksbooklists', item],
    //@ts-ignore
    queryFn: () => getBooksBooklists(item),
    refetchOnWindowFocus: false,
    staleTime: 300000 // 5 minutes
  })

//   console.log(item)
  if (isLoading) {
    return <Skeleton />
  }

  if (isError) {
    return <>Error...</>
  }
  return (
    <div>
      <h3 className='p-4 text-3xl'>Booklist with {item} in it</h3>
      <div className='space-y-4'>
        {data?.data.map(booklist => {
          return (
            <article
              key={booklist.id}
              className={`p-4 rounded-lg bg-slate-100 dark:bg-[#161616] prose-md dark:prose-p:text-gray-400 prose-h3:font-bold max-w-prose sm:max-w-full`}
            >
              <Link href={`/booklist/${booklist.id}`}>
                <div className='grid grid-flow-row auto-rows-max gap-y-2'>
                  <h3 className='first-letter:uppercase'>{booklist.title}</h3>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
    // <div className='space-y-4'>
    //   {item.map(comment => {
    //     let formattedMessage: string = ''
    //     if (comment.message) {
    //       const decodedMessage = decodeHTMLEntities(comment.message)
    //       formattedMessage = decodedMessage?.replace(/<br\/>/g, '\n') ?? ''
    //     }

    //     return (
    //       <article
    //         key={comment.id}
    //         className={`p-4 rounded-lg bg-slate-100 dark:bg-[#161616] prose-md dark:prose-p:text-gray-400 prose-h3:font-bold max-w-prose sm:max-w-full`}
    //       >
    //         <div className='grid grid-flow-row auto-rows-max gap-y-2'>
    //           <h3 className='first-letter:uppercase'>{comment.username}</h3>
    //           <p>
    //             <ReactMarkdown
    //               remarkPlugins={[remarkBreaks]}
    //               className='indent-0 first-letter:uppercase'
    //             >
    //               {formattedMessage}
    //             </ReactMarkdown>
    //           </p>
    //         </div>
    //       </article>
    //     )
    //   })}
    // </div>
  )
}
