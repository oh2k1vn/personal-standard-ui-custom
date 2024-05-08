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
    isBorder?: boolean;
    onClick?: () => void;
    className?: string;
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
            setOpen(true);
          },
          close() {
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
              className="relative bg-white z-50 rounded-lg p-6 max-w-[85vw] w-full"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              <div className="font-bold text-base text-black">
                {title ? title : "Thông báo"}
              </div>
              <div className="text-sm mt-3 mb-4 text-black/80">{content}</div>
              {buttons?.length ? (
                <div
                  className={cn("flex items-center gap-3 mt-4 ", {
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
                      className={cn("text-sm", {
                        "bg-transparent text-gray-600": index == 1,
                        "w-full": flex == "col",
                        "text-primary bg-transparent": buttons.length == 1,
                        "border border-primary": item.isBorder,
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
