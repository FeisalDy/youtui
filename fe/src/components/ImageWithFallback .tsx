'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, alt, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      alt={alt}
    />
  )
}

export default ImageWithFallback
