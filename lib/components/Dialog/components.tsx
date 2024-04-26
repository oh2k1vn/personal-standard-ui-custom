import { AnimatePresence, motion } from "framer-motion";
import { DialogProps } from ".";
import React from "react";

type Props = {
  getHandleOpen?: (value: () => void) => void;
  getHandleClose?: (value: () => void) => void;
  getHandleCloseCustom?: (value: (cb: () => void) => void) => void;
  getSheetVisibility?: (value: boolean) => void;
} & DialogProps;

const DialogComp = ({
  id,
  content,
  title,
  onClose,
  onOpen,
  getHandleClose,
  getHandleCloseCustom,
  getHandleOpen,
  getSheetVisibility,
}: Props) => {
  const [open, setOpen] = React.useState(true);

  const dialogId = id ?? "default";
  const elementId = `bottom-sheet-${dialogId}`;

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
              className="absolute -z-[1] inset-0 backdrop-blur-sm bg-black/30"
              onClick={() => handleClose()}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-4 bg-white rounded-lg flex flex-col min-w-[18rem]"
            >
              <div className="font-semibold mb-3 text-center">{title}</div>
              <div className="flex-1 no-scrollbar">{content}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DialogComp;
