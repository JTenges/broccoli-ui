import { RequestInviteDialogTrigger } from '@/components/request-invite/dialog'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicLayout/')({
  component: App,
})

function App() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div>A better way to enjoy every day.</div>
      <div>Be the first to know when we launch.</div>
      <RequestInviteDialogTrigger />
    </div>
  )
}
