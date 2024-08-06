import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { BookListDataT } from '@/types/booklist'
import Link from 'next/link'

type BookCardProp = {
  data: BookListDataT
}
export default function BookListCard ({ data }: BookCardProp) {
  return (
    <article className='prose lg:prose-xl prose-h3:dark:text-white '>
      <Card>
        <CardHeader>
          <Link
            href={'/booklist/' + data.id}
            target='_blank'
            rel='noopener noreferrer'
          >
            <h3>{data.title}</h3>
          </Link>
        </CardHeader>
        <CardBody>
          <ul>
            {data.data.slice(0, 5).map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </article>
  )
}
