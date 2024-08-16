import React, { useRef, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { decodeHTMLEntities } from '@/utils/decodeHTMLEntities'
import { Button } from '@nextui-org/react'
import { ChevronIcon } from '@/components/svg/ChevronIcon'

type InfoT = {
  info: string
}
type BookCoreProps = {
  item: InfoT
}

export function BookDescription ({ item }: BookCoreProps) {
  const [showMore, setShowMore] = useState(false)
  const [maxHeight, setMaxHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(showMore ? `${contentRef.current.scrollHeight}px` : '120px')
    }
  }, [showMore])

  const handleToggle = () => {
    setShowMore(prevShowMore => !prevShowMore)
  }

  if (!item.info) {
    return (
      <div className='bg-slate-100 dark:bg-transparent rounded-lg'>
        <div className='prose-xl rounded-md p-4'>
          <p>Description: </p>
          <p>No description available.</p>
        </div>
      </div>
    )
  }

  const decodedDescription = decodeHTMLEntities(item.info)
  const formattedDescription = decodedDescription
    ?.replace(/(<br\/>|<br>|<br \/>)/g, '\n\n') // Handle various <br> tags
    ?.replace(/(。)/g, '$1\n\n') // Add newline after '。'
    ?.replace(/(！”)/g, '$1\n\n') // Add newline after '！”'
    ?.replace(/(？”|！”|。”)/g, '$1\n\n')

  return (
    <div className='bg-transparent rounded-lg'>
      <div className='prose-sm md:prose-xl rounded-md my-2 md:my-0 md:py-4'>
        {/* <p>Description: </p> */}
        <div
          ref={contentRef}
          className='transition-max-height duration-300 ease-in-out overflow-hidden'
          style={{ maxHeight }}
        >
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {formattedDescription}
          </ReactMarkdown>
        </div>
        <div className='flex justify-center'>
          <Button
            onClick={handleToggle}
            variant='light'
            endContent={
              showMore ? (
                <ChevronIcon className='rotate-90' />
              ) : (
                <ChevronIcon className='-rotate-90' />
              )
            }
            disableRipple
            className='mt-2 hover: bg-transparent'
          >
            {showMore ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      </div>
    </div>
  )
}
