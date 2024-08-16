import { Metadata } from 'next'
import { getBookListById } from '@/server/getBooklist'
export async function generateMetadata ({
  params
}: {
  params: { id: number }
}): Promise<Metadata> {
  const id = params.id
  const product = await getBookListById(id)

  return {
    title: `${product.title}`
  }
}

export default function BookLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
