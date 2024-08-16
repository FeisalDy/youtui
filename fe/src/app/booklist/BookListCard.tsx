// <article className='prose lg:prose-xl prose-h3:dark:text-white p-0'>
//   {/* <article> */}
//   <Card>
//     <CardHeader className='py-0'>
//       <Link
//         href={'/booklist/' + data.id}
//         target='_blank'
//         rel='noopener noreferrer'
//       >
//         <h3>{data.title}</h3>
//       </Link>
//     </CardHeader>
//     <CardBody>
//       <ul>
//         {data.data.slice(0, 5).map((book, index) => (
//           <li key={index}>{book}</li>
//         ))}
//       </ul>
//     </CardBody>
//   </Card>
// </article>

'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { BookListDataT } from '@/types/booklist'
import ImageWithFallback from '@/components/ImageWithFallback '
import { useQuery } from '@tanstack/react-query'
import { getDetailTui } from '@/server/getTui'

type BookCardProp = {
  data: BookListDataT
}
export default function BookListCard ({ data }: BookCardProp) {
  const bookListPreview = data.data.slice(0, 3)

  const {
    data: bookDetails,
    error,
    isLoading
  } = useQuery({
    queryKey: ['tui', bookListPreview],
    queryFn: () => Promise.all(bookListPreview.map(book => getDetailTui(book))),
    enabled: bookListPreview.length > 0
  })

  return (
    <div className='relative overflow-hidden p-4'>
      <h3 className='font-bold mb-2'>{data.title}</h3>
      <div
        className='relative flex items-center justify-center'
        style={{ width: '400px', height: '600px' }}
      >
        {bookDetails?.map((book, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0`}
            style={{
              width: '400px',
              height: '600px',
              zIndex: 10 + index,
              transform: `translateX(${index * 8}px)`
            }}
          >
            <ImageWithFallback
              src={book?.cover || '/default_book.png'}
              alt={book?.title || 'Book Image'}
              width={400}
              height={600}
              className='object-cover shadow-lg'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
