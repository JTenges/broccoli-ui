import { Button } from "@/components/ui/button";

export function Completed({onConfirm}: {onConfirm: () => void}) {
  return <div className="flex flex-col">
    <div>All done!</div>
    <div>You will be one of the first to experience</div>
    <div>Broccoli & Co. when we launch.</div>
    <Button type="button" onClick={() => onConfirm()}>OK</Button>
  </div>
}