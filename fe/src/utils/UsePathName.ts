'use client'
import { usePathname } from 'next/navigation'

export default function UseFirstPathName () {
  const pathname = usePathname()

  if (!pathname || pathname.length === 1) {
    return pathname
  }

  const firstSegmentMatch = pathname.match(/^\/([^/]+)/)

  return firstSegmentMatch ? firstSegmentMatch[1] : ''
}
