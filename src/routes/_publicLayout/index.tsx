import { RequestInviteDialogTrigger } from '@/components/request-invite/dialog'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicLayout/')({
  component: App,
})

function App() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className='mx-4 text-6xl font-bold mb-10'>A better way to enjoy every day.</div>
      <div className='mb-10'>Be the first to know when we launch.</div>
      <RequestInviteDialogTrigger />
    </div>
  )
}
