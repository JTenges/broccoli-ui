import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";

export function Completed({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto text-2xl font-semibold my-4">All done!</div>
      <hr className="mx-auto w-32 accent-black" />
      <div className="mt-8 mb-8 flex flex-col items-center">
        <div>You will be one of the first to experience</div>
        <div>Broccoli & Co. when we launch.</div>
      </div>
      <CheckCircleIcon
        className="mb-8 text-green-500"
        size={128}
        strokeWidth={0.75}
      />
      <Button type="button" className="w-full" onClick={() => onConfirm()}>
        OK
      </Button>
    </div>
  );
}
