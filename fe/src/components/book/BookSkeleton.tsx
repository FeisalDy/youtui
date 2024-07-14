import { Skeleton } from '@nextui-org/skeleton'

export function BookSkeleton () {
  return (
    <>
      <div className='bg-slate-100 dark:bg-[#161616] w-full pb-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-rows-1 grid-cols-5 sm:grid-cols-6 grid-flow-col gap-4'>
            <div className='row-span-1 col-span-2 sm:col-span-2'>
              <Skeleton className='h-[600px] w-full rounded-lg' />
            </div>
            <div className='col-span-3 sm:col-span-4 m-4 space-y-3'>
              <Skeleton className='h-8 w-4/5 rounded-lg' />
              <Skeleton className='h-6 w-2/5 rounded-lg' />
              <Skeleton className='h-6 w-1/5 rounded-lg' />
              <Skeleton className='h-6 w-1/12 rounded-lg' />
            </div>
          </div>
        </div>
      </div>
      <div className='container max-w-6xl mt-4'>
        <div className='grid grid-flow-row auto-rows-max gap-y-4'>
          <Skeleton className='h-7 w-full rounded-lg' />
          <Skeleton className='h-7 w-full rounded-lg' />
          <Skeleton className='h-7 w-full rounded-lg' />
          <Skeleton className='h-7 w-4/5 rounded-lg' />
          <br />
          <Skeleton className='h-7 w-full rounded-lg' />
          <Skeleton className='h-7 w-full rounded-lg' />
          <Skeleton className='h-7 w-3/5 rounded-lg' />
        </div>
      </div>
    </>
  )
}
