import { Metadata } from 'next'

export async function generateMetadata ({
  params
}: {
  params: { unique: string | number }
}): Promise<Metadata> {
  const decodedUnique = decodeURIComponent(params.unique.toString())

  return {
    title: `${decodedUnique}`
  }
}

export default function BookLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
