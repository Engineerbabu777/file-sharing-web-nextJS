// 'use client'

import { AlignJustify } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image';

export default function TopHeader ({}) {
  return (
    <>
      <div className='flex p-5 border-b items-center first-letter:justify-between md:justify-end'>
        <AlignJustify className='md:hidden' />
        <Image
          className='md:hidden'
          src={'/logo.svg'}
          width={150}
          height={100}
        />
        <UserButton />
      </div>
    </>
  )
}
