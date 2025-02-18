import React from 'react'
import { Button } from '@/components/ui/button'

function Chai() {
  return (
    <main className='bg-gray-800 h-full flex flex-col justify-center items-center'>
        <div>Page 😉</div>
        <Button>Shadcn button</Button>
        <Button variant={"chai"}>Shadcn button</Button>
    </main>
  )
}

export default Chai