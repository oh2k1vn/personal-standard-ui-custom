/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  AnimatePresence,
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { IBottomSheetProps, TArrowBottomSheet } from "types/bottomSheet";
import { TVoid } from "types/common";
import { cn } from "utils/cn";
import { cleanupRootStyles } from "utils/utils";

const BottomSheetComp: FC<IBottomSheetProps> = ({
  id,
  content,
  header,
  footer,
  dragHandle,
  getHandleClose,
  getHandleCloseCustom,
  getHandleOpen,
  getSheetVisibility,
  onOpen,
  onClose,
  darkMode,
  maskClosable,
  debug,
  height,
}) => {
  const sheetY = useMotionValue(0);
  const controls = useDragControls();
  const [open, setOpen] = useState(true);

  const sheetRef = useRef<HTMLDivElement>(null);

  const [sheetHeight, setSheetHeight] = useState(0);
  const [_, setArrow] = useState<TArrowBottomSheet>("straight");

  const sheetId = id ?? "default";
  const elementId = `bottom-sheet-${sheetId}`;

  const handleClose = () => {
    cleanupRootStyles();
    if (!open) return;
    setOpen(false);
    onClose?.();
  };

  const handleCloseCustom = (cb: TVoid) => {
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

  useEffect(() => {
    setSheetHeight(sheetRef?.current?.offsetHeight ?? 0);
    if (open) {
      onOpen?.();
    }
  }, [sheetRef, open, onOpen]);

  const maxDrag = sheetHeight / 5;

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
            className="fixed top-0 left-0 size-full z-[99999] bg-black/50"
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute top-0 left-0 size-full grid grid-rows-1"
              style={{
                y: sheetY,
              }}
              drag="y"
              dragControls={controls}
              dragConstraints={{
                top: 0,
                bottom: sheetHeight,
              }}
              dragElastic={0.1}
              onDrag={(_, info) => {
                setArrow(maxDrag < info.offset.y ? "down" : "up");
              }}
              onDragStart={(e, info) => {
                if (
                  !(e?.target as HTMLDivElement)?.classList?.contains(
                    "draggable"
                  )
                ) {
                  // @ts-ignore
                  controls?.componentControls.forEach((entry) => {
                    entry.stop(e, info);
                  });
                }
              }}
              onDragEnd={() => {
                setArrow("straight");
                if (sheetY.get() < maxDrag) {
                  animate(sheetY, 0, { type: "spring" });
                } else {
                  setArrow("down");
                  handleClose();
                }
              }}
            >
              <Mask
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                debug={debug}
                {...(maskClosable
                  ? {
                      onTap: () => handleClose(),
                    }
                  : {})}
                {...(dragHandle?.includes("mask")
                  ? { className: "draggable", cursorMove: true }
                  : {})}
              />
              <motion.div
                className={cn("overflow-hidden w-full rounded-t-[10px]", {
                  "bg-[#282828] text-white": darkMode,
                  "bg-white": !darkMode,
                })}
                style={{ height: height ? height + "vh" : "auto" }}
                ref={sheetRef}
                id="sheet-content"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.2,
                }}
              >
                <div className="max-h-[90vh] relative flex flex-col h-full">
                  <div className="relative pt-4 bg-white z-10">
                    <div className="w-16 h-1.5 rounded-full bg-black bg-opacity-20 mx-auto" />
                    {header && <div className="pt-[10px]">{header}</div>}
                    {dragHandle?.includes("header") && (
                      <DragHandle debug={debug} />
                    )}
                  </div>

                  <div className="size-full relative overflow-hidden flex-1">
                    <div
                      className={cn(
                        "size-full overflow-auto relative no-scrollbar",
                        {
                          "pt-7": !header,
                        }
                      )}
                    >
                      {content}
                    </div>
                    {dragHandle?.includes("content") && (
                      <DragHandle debug={debug} />
                    )}
                  </div>
                  {footer ? (
                    <div className="p-[15px] relative border-t border-[rgba(0, 0, 0, 0.05)]">
                      {footer}
                      {dragHandle?.includes("footer") && (
                        <DragHandle debug={debug} />
                      )}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomSheetComp;

const Mask = styled(motion.div)<{
  debug?: boolean;
  cursorMove?: boolean;
}>(
  ({ debug, cursorMove }) => `
  ${cursorMove ? `cursor: move;` : ""}
  ${
    debug
      ? `
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEgxMFYxMEgwVjBaIiBmaWxsPSIjQkNCQ0JDIi8+CjxwYXRoIGQ9Ik0xMCAxMEgyMFYyMEgxMFYxMFoiIGZpbGw9IiNCQ0JDQkMiLz4KPHBhdGggZD0iTTEwIDBIMjBWMTBIMTBWMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDEwSDEwVjIwSDBWMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K);
    `
      : ""
  }
`
);

const DragHandle = styled.div.attrs({ className: "draggable" })<{
  debug?: boolean;
}>(
  ({ debug }) => `
  &.draggable{ cursor: move; }
  ${
    debug
      ? `
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEgxMFYxMEgwVjBaIiBmaWxsPSIjQkNCQ0JDIi8+CjxwYXRoIGQ9Ik0xMCAxMEgyMFYyMEgxMFYxMFoiIGZpbGw9IiNCQ0JDQkMiLz4KPHBhdGggZD0iTTEwIDBIMjBWMTBIMTBWMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDEwSDEwVjIwSDBWMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K);
      opacity: 0.2;
    `
      : ""
  }
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`
);
