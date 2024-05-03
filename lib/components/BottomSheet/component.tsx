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
  iconClose = false,
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
                  "rounded-none": height === 100,
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
                  <div className="relative bg-white z-10">
                    {header && (
                      <div className="py-3 text-center font-semibold text-lg">
                        {header}
                      </div>
                    )}
                    <div className="w-16 h-1.5 rounded-full bg-black bg-opacity-20 mx-auto" />
                    {dragHandle?.includes("header") && (
                      <DragHandle debug={debug} />
                    )}

                    {/* icon close */}
                    {iconClose || height === 100 ? (
                      <svg
                        onClick={handleClose}
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-8 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m12 12.727l-3.592 3.592q-.16.16-.354.15T7.7 16.3t-.16-.363t.16-.364L11.273 12L7.681 8.433q-.16-.16-.15-.364t.169-.363t.363-.16t.364.16L12 11.298l3.567-3.592q.16-.16.354-.16t.354.16q.165.165.165.366t-.165.36L12.702 12l3.592 3.592q.16.16.16.354t-.16.354q-.165.165-.366.165t-.36-.165z"
                        />
                      </svg>
                    ) : null}
                  </div>

                  <div className="size-full relative overflow-hidden flex-1 mt-4">
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
