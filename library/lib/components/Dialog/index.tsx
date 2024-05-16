/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { Button, cn } from "main";
import React from "react";

interface IDialogProps {
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  buttons?: {
    text: string;
    isClose?: boolean;
    style?: React.CSSProperties;
    isBorder?: boolean;
    onClick?: () => void;
    className?: string;
  }[];
  flex?: "row" | "col";
  closeByBackdropClick?: boolean;
}

export interface IDialog {
  open: (data: IDialogProps) => void;
  close: () => void;
}

export const Dialog = React.forwardRef<IDialog, IDialogProps>((_, ref) => {
  const [open, setOpen] = React.useState(false);
  const [dataDialog, setDataDialog] = React.useState<IDialogProps>({});

  React.useImperativeHandle(
    ref,
    () => ({
      open: handleOpenDialog,
      close: handleCloseDialog,
    }),
    []
  );

  const handleOpenDialog = (data: IDialogProps) => {
    if (data) {
      setDataDialog({
        title: data.title,
        content: data.content,
        buttons: data.buttons,
        flex: data.flex ? data.flex : "row",
        closeByBackdropClick: data.closeByBackdropClick ? true : false,
      });
    }
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    setDataDialog({});
    setOpen(false);
    document.body.style.overflow = "";
  };

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
            onClick={() => {
              if (!dataDialog.closeByBackdropClick) {
                handleCloseDialog();
              }
            }}
            className="absolute inset-0 -z-[1] bg-neutral-950/70 "
          ></motion.div>
          <motion.div
            className="relative bg-white z-50 rounded-lg p-6 max-w-[85vw] w-full"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
          >
            <div className="font-bold text-base text-black">
              {dataDialog.title ? dataDialog.title : "Thông báo"}
            </div>
            <div className="text-sm mt-3 mb-4 text-black/80">
              {dataDialog.content}
            </div>
            {dataDialog.buttons?.length ? (
              <div
                className={cn("flex items-center gap-3 mt-4 ", {
                  "flex-col": dataDialog.flex == "col",
                  "flex-row justify-end": dataDialog.flex == "row",
                  "justify-center items-center": dataDialog.buttons.length == 1,
                })}
              >
                {dataDialog.buttons?.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      if (item.isClose || !item.onClick) {
                        handleCloseDialog();
                      } else {
                        item.onClick && item.onClick();
                      }
                    }}
                    className={cn("text-sm", {
                      "bg-transparent text-gray-600": index == 1,
                      "w-full": dataDialog.flex == "col",
                      "text-primary bg-transparent":
                        dataDialog.buttons?.length == 1,
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
});
