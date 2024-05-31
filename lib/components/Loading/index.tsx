import { AnimatePresence, motion } from "framer-motion";
import { cn } from "main";
import React from "react";

interface ILoading extends React.ComponentPropsWithoutRef<"div"> {
  src?: string;
  active?: boolean;
  hideOverlay?: boolean;
}

const Loading: React.FC<ILoading> = ({
  src,
  active = false,
  hideOverlay = false,
}) => {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 "
        >
          <div className="relative size-full flex justify-center items-center">
            <div
              className={cn("size-10 rounded-full relative z-50", {
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
            {!hideOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black/10 absolute inset-0"
              ></motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Loading;
