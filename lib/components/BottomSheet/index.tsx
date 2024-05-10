/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnimatePresence,
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import useMeasure from "react-use-measure";
import React from "react";
import { cn } from "main";

interface IBottomSheetProps {
  children: React.ReactNode;
  setHeight?: number;
  title?: string;
  iconClose?: boolean;
}

export interface IBottomSheet {
  open: () => void;
  close: () => void;
}

export const BottomSheet = React.forwardRef<IBottomSheet, IBottomSheetProps>(
  ({ children, setHeight, title, iconClose = false }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(
      ref,
      () => {
        return {
          open() {
            setOpen(true);
          },
          close() {
            handleClose();
          },
        };
      },
      []
    );

    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
      animate(scope.current, {
        opacity: [1, 0],
      });
      const yStart = typeof y.get() === "number" ? y.get() : 0;
      await animate("#drawer", {
        y: [yStart, height == 0 ? 250 : height],
      });

      setOpen(false);
    };

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }, [open]);
    return (
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            ref={scope}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-neutral-950/30 select-none"
          >
            <motion.div
              id="drawer"
              ref={drawerRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                ease: [0.32, 0.72, 0, 1],
                duration: 0.5,
              }}
              className={cn(
                "absolute bottom-0 w-full overflow-hidden rounded-t-2xl bg-white max-h-screen flex flex-col"
              )}
              style={{
                y,
                height: setHeight
                  ? setHeight + "vh"
                  : "fit-content -webkit-fill-available",
                maxHeight: window.innerHeight + "px",
              }}
              drag="y"
              dragControls={controls}
              onDragEnd={() => {
                if (y.get() >= 50) {
                  handleClose();
                }
              }}
              dragListener={false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              dragElastic={{
                top: 0,
                bottom: 0.5,
              }}
            >
              <div className="absolute left-0 right-0 top-0 z-10 flex flex-col justify-center">
                <div
                  onPointerDown={(e) => {
                    controls.start(e);
                  }}
                  className={cn(
                    "font-bold pb-6 px-12 text-center relative bg-white py-4 touch-none active:cursor-grabbing cursor-grab",
                    {
                      "before:bottom-3 pt-2": title,
                    }
                  )}
                >
                  <p className="line-clamp-1 pb-1 text-center font-semibold text-lg">
                    {title}
                  </p>
                  <div
                    className={cn(
                      "h-1.5 w-14 bg-gray-300 absolute rounded-full left-1/2 -translate-x-1/2 bottom-3",
                      {
                        "bottom-2": title,
                      }
                    )}
                  ></div>

                  {iconClose && (
                    <svg
                      onClick={handleClose}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute size-5 text-gray-300 right-4 top-2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "relative z-0 h-full overflow-y-scroll mt-5 no-scrollbar w-full",
                  {
                    "mt-14": title,
                  }
                )}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
