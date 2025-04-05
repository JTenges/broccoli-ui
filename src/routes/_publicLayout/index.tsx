import { RequestInviteDialogTrigger } from "@/components/request-invite/dialog";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/_publicLayout/")({
  component: App,
});

function App() {
  return (
    <div className="h-full flex items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="space-y-6"
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            type: "spring",
            stiffness: 100,
          }}
        >
          A better way to enjoy
          <br />
          <span className="relative">
            every day
            <motion.span
              className="absolute bottom-1 left-0 w-full h-3 bg-green-100 -z-10"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 1.2 }}
            ></motion.span>
          </span>
          .
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Be the first to know when we launch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="pt-4"
        >
          <RequestInviteDialogTrigger />
        </motion.div>
      </motion.div>
    </div>
  );
}
