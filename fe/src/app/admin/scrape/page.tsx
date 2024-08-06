'use client'
import React, { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { postUrl } from '@/server/postUrl'
import { z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const formSchema = z.object({
  url: z.string().url({ message: 'Invalid url' })
})

export default function Home () {
  const [url, setUrl] = useState<string>('')

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn: async () => {
      const response = await postUrl(url)
      if (response.code === 200) {
        return response.data
      } else {
        throw new Error(response.error)
      }
    },
    onSuccess: () => {
      setUrl('')
      toast.success('Scrape Booklist Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    },
    onError: error => {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      formSchema.parse({ url })
      mutate()
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0].message)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <main className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <form onSubmit={onSubmit} className='flex w-full space-x-4'>
          <Input
            isClearable
            type='text'
            label='Url'
            variant='bordered'
            placeholder='Enter the url'
            value={url}
            onChange={e => setUrl(e.target.value)}
            onClear={() => setUrl('')}
            className='w-full'
          />
          <Button
            type='submit'
            color='primary'
            className='self-center'
            size='lg'
            disabled={isPending}
          >
            {isPending ? 'Posting...' : 'Submit'}
          </Button>
        </form>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </main>
  )
}
