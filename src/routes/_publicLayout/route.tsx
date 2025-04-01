import { createFileRoute, Outlet } from '@tanstack/react-router'
import { HeartIcon } from 'lucide-react'

export const Route = createFileRoute('/_publicLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-full flex flex-col'>
    <div className='ml-10 my-6'>BROCCOLI & CO.</div>
    <hr/>
    <Outlet />
    <hr/>
    <div className='my-4 flex flex-col items-center text-xs'><span>Made with <HeartIcon className='inline' fill='black' size={14}/> from Sydney</span><span>copyright Broccoli & Co. All rights reserved.</span></div>
  </div>
}
