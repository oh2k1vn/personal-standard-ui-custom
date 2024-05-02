/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "main";

interface ICollapse {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Collapse: React.FC<ICollapse> = ({
  isOpen,
  children,
  className,
}) => {
  const [height, setHeight] = useState<number | "auto">(isOpen ? "auto" : 0);

  const getHeight = () => {
    if (isOpen) {
      const contentHeight =
        document.getElementById("collapseContent")?.scrollHeight;
      if (contentHeight) {
        setHeight(contentHeight);
      }
    } else {
      setHeight(0);
    }
  };

  React.useEffect(() => {
    getHeight();
  }, [isOpen]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className={cn("transition-all duration-500", className, {
          "visible opacity-100": isOpen,
          "invisible opacity-0": !isOpen,
        })}
        style={{ height }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 100 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{
          opacity: {
            duration: 0.3,
          },
          height: {
            duration: 0.4,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
