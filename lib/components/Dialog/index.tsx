// /* eslint-disable react-refresh/only-export-components */
// import { createRoot } from "react-dom/client";
// import DialogComp from "./components";
// import { ISheetInfo } from "types/bottomSheet";
// import { ICreate } from "types/Dialog";
// import { ICloseOptions } from "types/common";

// const DialogInfo: ISheetInfo = {
//   default: {
//     visibility: undefined,
//     open: undefined,
//     close: undefined,
//     closeCustom: undefined,
//   },
// };

// export const Dialog = {
//   create: ({ id, ...rest }: ICreate) => {
//     const dialogId = id ?? "default";
//     const elementId = `dialog-${dialogId}`;
//     if (typeof window !== "undefined") {
//       document?.getElementById?.(elementId)?.remove();
//       const containerDomNode = document.createElement("div");
//       containerDomNode.setAttribute("id", elementId);
//       const app = document.getElementById("mini-app");

//       // document?.body.appendChild(containerDomNode);
//       if (app) {
//         app.appendChild(containerDomNode);
//       }

//       DialogInfo[dialogId] = {};

//       const container = document.getElementById(elementId);
//       if (container) {
//         const root = createRoot(container);
//         root.render(
//           <DialogComp
//             id={id}
//             getHandleCloseCustom={(value) => {
//               DialogInfo[dialogId].closeCustom = value;
//             }}
//             getSheetVisibility={(value) => {
//               DialogInfo[dialogId].visibility = value;
//             }}
//             getHandleClose={(value) => {
//               DialogInfo[dialogId].close = value;
//             }}
//             getHandleOpen={(value) => {
//               DialogInfo[dialogId].open = value;
//             }}
//             {...rest}
//           />
//         );
//       }
//     }
//   },
//   close: (options?: ICloseOptions) => {
//     const dialogId = options?.id ?? "default";
//     if (!DialogInfo[dialogId]?.visibility) return;

//     if (options?.callback) {
//       DialogInfo[dialogId]?.closeCustom?.(options.callback);
//     } else {
//       DialogInfo[dialogId]?.close?.();
//     }
//   },
//   isOpen: (id?: string) => {
//     const dialogId = id ?? "default";
//     return DialogInfo[dialogId].visibility;
//   },
// };

import { AnimatePresence, motion } from "framer-motion";
import { Button, cn } from "main";
import React from "react";

interface IDialogProps {
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  buttons?: {
    text: string;
    close?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
  }[];
  flex?: "row" | "col";
}

export interface IDialog {
  open: () => void;
  close: () => void;
}

export const Dialog = React.forwardRef<IDialog, IDialogProps>(
  ({ title, content, buttons, flex = "row" }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(
      ref,
      () => {
        return {
          open() {
            console.log("open");
            setOpen(true);
          },
          close() {
            console.log("close");
            setOpen(false);
          },
        };
      },
      []
    );

    const handleClose = async () => {
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex justify-center items-center select-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 -z-[1] bg-neutral-950/70 "
            ></motion.div>
            <motion.div
              className="relative bg-white z-50 rounded-lg px-4 py-2 max-w-[85vw] w-full"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              <div className="font-medium text-black">
                {title ? title : "Thông báo"}
              </div>
              <div className="text-sm mt-2 mb-4 text-black">{content}</div>
              {buttons?.length ? (
                <div
                  className={cn("flex items-center gap-2 mt-4 ", {
                    "flex-col": flex == "col",
                    "flex-row justify-end": flex == "row",
                    "justify-center items-center": buttons.length == 1,
                  })}
                >
                  {buttons?.map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        if (item.close) {
                          handleClose();
                        } else {
                          item.onClick && item.onClick();
                        }
                      }}
                      className={cn("text-sm ", {
                        "bg-transparent text-gray-600": index == 1,
                        "w-full": flex == "col",
                        "text-primary bg-transparent": buttons.length == 1,
                      })}
                      style={item.style}
                    >
                      {item.text}
                    </Button>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
