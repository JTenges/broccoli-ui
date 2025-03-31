import { Completed } from "@/components/request-invite/stage/completed";
import { EnterDetailsForm } from "@/components/request-invite/stage/enter-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

enum RequestInviteStage {
  ENTER_DETAILS = 'ENTER_DETAILS',
  COMPLETED = 'COMPLETED'
}

export function RequestInviteDialogTrigger() {
  const [stage, setStage] = useState(RequestInviteStage.ENTER_DETAILS)
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Request an invite</Button>
      </DialogTrigger>
      <DialogOverlay/>
      <DialogContent>
        <DialogTitle>Request an invite</DialogTitle>
        {stage === RequestInviteStage.ENTER_DETAILS && <EnterDetailsForm onCompleted={() => setStage(RequestInviteStage.COMPLETED)} />}
        {stage === RequestInviteStage.COMPLETED && <Completed onConfirm={() => setOpen(false)}/>}
      </DialogContent>
    </Dialog>
  )
}