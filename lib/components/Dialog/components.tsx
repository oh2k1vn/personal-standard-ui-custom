import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button, cn } from "main";
import { IDialogProps } from "types/Dialog";

const DialogComp: React.FC<IDialogProps> = ({
  id,
  content,
  buttons,
  title,
  flex = "row",
  onClose,
  onOpen,
  getHandleClose,
  getHandleCloseCustom,
  getHandleOpen,
  getSheetVisibility,
}) => {
  const [open, setOpen] = React.useState(true);

  const dialogId = id ?? "default";
  const elementId = `dialog-${dialogId}`;

  const handleClose = () => {
    if (!open) return;
    setOpen(false);
    onClose?.();
  };

  const handleCloseCustom = (cb: () => void) => {
    setOpen(false);
    cb?.();
  };

  const handleOpen = () => {
    setOpen(true);
    onOpen?.();
  };

  getHandleCloseCustom?.(handleCloseCustom);
  getHandleOpen?.(handleOpen);
  getHandleClose?.(handleClose);
  getSheetVisibility?.(open);

  const removeToDom = () => {
    if (typeof window !== "undefined") {
      document?.getElementById?.(elementId)?.remove();
    }
  };
  return (
    <>
      <AnimatePresence onExitComplete={() => removeToDom()}>
        {open && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -z-[1] inset-0 bg-black/30"
              onClick={() => handleClose()}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-4 bg-white rounded-lg flex flex-col min-w-[18rem] max-w-[90%]"
            >
              {title && <div className="font-semibold mb-3 ">{title}</div>}
              <div className="flex-1 no-scrollbar text-sm">{content}</div>
              {buttons?.length ? (
                <div
                  className={cn("flex items-center gap-2 mt-4", {
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
                          item.onClick;
                        }
                      }}
                      className={cn("text-sm", {
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
    </>
  );
};

export default DialogComp;
