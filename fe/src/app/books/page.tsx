export default async function BookPage () {
  const data = await fetch(
    'http://localhost:3333/api/en-books/2?comments=true'
  ).then(res => res.json())
  return (
    <div className='grid grid-flow-row auto-rows-max gap-y-4'>
      {data.book.name}
    </div>
  )
}
