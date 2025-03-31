import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-full flex flex-col'>
    <div>BROCCOLI & CO.</div>
    <Outlet />
    <div className='flex flex-col items-center'><span>Made with love from Sydney</span><span>copyright Broccoli & Co. All rights reserved.</span></div>
  </div>
}
