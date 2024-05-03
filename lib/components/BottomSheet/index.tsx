// import { createRoot } from "react-dom/client";
// import { ICreate, ISheetInfo } from "types/bottomSheet";
// import { ICloseOptions } from "types/common";
// import { applyRootStyles } from "utils/utils";
// import BottomSheetComp from "./component";

// const sheetInfo: ISheetInfo = {
//   default: {
//     visibility: undefined,
//     open: undefined,
//     close: undefined,
//     closeCustom: undefined,
//   },
// };

// export const BottomSheet = {
//   create: ({
//     dragHandle = ["header", "mask"],
//     maskClosable = true,
//     id,
//     ...rest
//   }: ICreate) => {
//     const sheetId = id ?? "default";
//     const elementId = `bottom-sheet-${sheetId}`;
//     if (typeof window !== "undefined") {
//       document?.getElementById?.(elementId)?.remove();
//       const containerDomNode = document.createElement("div");
//       containerDomNode.setAttribute("id", elementId);
//       const app = document.getElementById("mini-app");

//       // document?.body.appendChild(containerDomNode);
//       if (app) {
//         app.appendChild(containerDomNode);
//       }

//       sheetInfo[sheetId] = {};

//       const container = document.getElementById(elementId);

//       if (container) {
//         const root = createRoot(container);
//         applyRootStyles();

//         root.render(
//           <BottomSheetComp
//             id={id}
//             dragHandle={dragHandle}
//             maskClosable={maskClosable}
//             getHandleCloseCustom={(value) => {
//               sheetInfo[sheetId].closeCustom = value;
//             }}
//             getSheetVisibility={(value) => {
//               sheetInfo[sheetId].visibility = value;
//             }}
//             getHandleClose={(value) => {
//               sheetInfo[sheetId].close = value;
//             }}
//             getHandleOpen={(value) => {
//               sheetInfo[sheetId].open = value;
//             }}
//             {...rest}
//           />
//         );
//       }
//     }
//   },
//   close: (options?: ICloseOptions) => {
//     const sheetId = options?.id ?? "default";
//     if (!sheetInfo[sheetId]?.visibility) return;

//     if (options?.callback) {
//       sheetInfo[sheetId]?.closeCustom?.(options.callback);
//     } else {
//       sheetInfo[sheetId]?.close?.();
//     }
//   },
//   isOpen: (id?: string) => {
//     const sheetId = id ?? "default";
//     return sheetInfo[sheetId].visibility;
//   },
// };

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
        y: [yStart, height],
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
            className="fixed inset-0 z-50 bg-neutral-950/70 select-none"
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
                height: setHeight ? setHeight + "vh" : "fit-content",
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
                    "cursor-grab w-full bg-white touch-none active:cursor-grabbing relative before:h-1.5 before:w-14 before:bg-gray-300 before:absolute before:rounded-full before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2",
                    {
                      "before:top-[2.8rem] text-center font-bold pb-6 pt-2":
                        title,
                      "p-4": !title,
                    }
                  )}
                >
                  {title}

                  {/* Icon close */}
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
                  "relative z-0 h-full overflow-y-scroll p-4 mt-5 no-scrollbar w-full",
                  {
                    "mt-12": title,
                  }
                )}
              >
                <ResizablePanel duration={0.5}>{children}</ResizablePanel>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

function ResizablePanel({ children, duration }: any) {
  const [ref, { height }] = useMeasure();

  const animations = {
    fade: {
      animate: {
        transition: { duration: duration, delay: duration },
      },
      exit: { transition: { duration: duration } },
    },
  };

  return (
    <motion.div
      className="relative overflow-hidden w-full"
      animate={{ height: height || "auto" }}
      transition={{ duration }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          {...animations.fade}
          transition={{ duration }}
          className={`${height ? "absolute" : "relative"} w-full`}
        >
          <div ref={ref} className="w-full">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: string, value: object | null) => {
    if (key.startsWith("_")) return;
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
