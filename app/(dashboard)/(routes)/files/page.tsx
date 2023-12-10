import React from 'react'
import {UserButton} from '@clerk/nextjs';

type Props = {}

function page({}: Props) {
  return (
    <div>page

        <UserButton afterSignOutUrl={"/"}/>
    </div>
  )
}

export default page