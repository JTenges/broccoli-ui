import { Completed } from "@/components/request-invite/stage/completed";
import { EnterDetailsForm } from "@/components/request-invite/stage/enter-details";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

enum RequestInviteStage {
  ENTER_DETAILS = "ENTER_DETAILS",
  COMPLETED = "COMPLETED",
}

export function RequestInviteDialogTrigger() {
  const [stage, setStage] = useState(RequestInviteStage.ENTER_DETAILS);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 bg-green-700 hover:bg-green-600">
          <span>Request an invite</span>
          <motion.span
            className="inline-block ml-2"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </motion.span>
        </Button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle className="sr-only">Request an invite</DialogTitle>
        {stage === RequestInviteStage.ENTER_DETAILS && (
          <EnterDetailsForm
            onCompleted={() => setStage(RequestInviteStage.COMPLETED)}
          />
        )}
        {stage === RequestInviteStage.COMPLETED && (
          <Completed onConfirm={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
