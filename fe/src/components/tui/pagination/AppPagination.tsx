'use client'
import React from 'react'
import {
  Pagination,
  PaginationItemType,
  PaginationProps
} from '@nextui-org/react'
import { PaginationT } from '@/types/book'
import cn from 'classnames'
import { ChevronIcon } from '../../svg/ChevronIcon'

type Prop = {
  data: PaginationT
  setQueryParams: (
    newParams: Partial<{
      tag?: string
      limit?: number
      length?: number
      page?: number
    }>
  ) => void
}

export default function AppPagination ({
  data,
  setQueryParams
}: Prop): JSX.Element {
  const renderItem: PaginationProps['renderItem'] = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, 'bg-default-200/50 min-w-8 w-8 h-8')}
          onClick={onNext}
        >
          <ChevronIcon className='rotate-180' />
        </button>
      )
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, 'bg-default-200/50 min-w-8 w-8 h-8')}
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      )
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      )
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive && 'text-white bg-blue-500 font-bold'
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    )
  }

  return (
    <Pagination
      variant='light'
      total={data.totalPages}
      page={data.page}
      onChange={page => setQueryParams({ page })}
      className='overflow-x-hidden m-4'
      renderItem={renderItem}
      disableCursorAnimation
      showControls
    />
  )
}
