'use client'

import React from 'react'
import SideNav from './_components/SideNav'
import TopHeader from './_components/Header'

export default function layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='hidden md:flex flex-col h-full md:w-64 fixed inset-0 inset-y-0 z-50'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        <TopHeader />

        {children}
      </div>
    </>
  )
}
