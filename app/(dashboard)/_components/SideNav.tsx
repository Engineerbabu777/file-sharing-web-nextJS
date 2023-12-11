'use client'

import { Upload, File, Shield } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function SideNav ({}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const menuList = [
    { id: 1, name: 'Upload', icon: Upload, path: '/upload' },
    { id: 1, name: 'File', icon: File, path: '/files' },
    { id: 1, name: 'Upgrade', icon: Shield, path: '/upgrade' }
  ]

  return (
    <>
      <div className="shadow-sm border-r h-full">
        <div className='p-5 border-b '>
          <Image src={'/logo.svg'} width={150} height={100} />
        </div>

        <div className='flex flex-col float-left w-full '>
          {menuList.map((item, index) => (
            <>
              <button
                onClick={() => setActiveIndex(index)}
                className={`${activeIndex === index && "text-blue-700"} flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500`}
              >
                <item.icon />
                <h2>{item.name}</h2>
              </button>
            </>
          ))}
        </div>
      </div>
    </>
  )
}
