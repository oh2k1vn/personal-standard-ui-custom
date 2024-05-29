import { AnimatePresence, motion } from "framer-motion";
import { cn } from "main";
import React from "react";

interface ILoading extends React.ComponentPropsWithoutRef<"div"> {
  src?: string;
  active?: boolean;
}

export const Loading: React.FC<ILoading> = ({ src, active }) => {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className={cn("size-10 rounded-full relative", {
              "from-primary to-white bg-gradient-to-tr ": !src,
            })}
          >
            <span className="absolute size-14 border border-gray-300 -top-2 -left-2 rounded-full after:size-2 after:absolute after:top-0 after:left-2 after:rounded-full after:bg-primary animate-spin"></span>
            <img
              src={src}
              className="size-full rounded-full bg-cover bg-no-repeat object-cover overflow-hidden"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
