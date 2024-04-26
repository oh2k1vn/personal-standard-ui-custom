/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import DialogComp from "./components";

interface DialogInfoProps {
  [key: string]: {
    close?: () => void;
    open?: () => void;
    visibility?: boolean;
    closeCustom?: (cb: () => void) => void;
  };
}

export interface DialogProps {
  id?: string;
  content: React.ReactNode;
  title?: string;
  onClose?: () => void;
  onOpen?: () => void;
}

interface CloseProps {
  id?: string;
  callback?: () => void;
}

const DialogInfo: DialogInfoProps = {
  default: {
    visibility: undefined,
    open: undefined,
    close: undefined,
    closeCustom: undefined,
  },
};

export const Dialog = {
  create: ({ id, ...rest }: DialogProps) => {
    const dialogId = id ?? "default";
    const elementId = `dialog-${dialogId}`;
    if (typeof window !== "undefined") {
      document?.getElementById?.(elementId)?.remove();
      const containerDomNode = document.createElement("div");
      containerDomNode.setAttribute("id", elementId);
      document?.body.appendChild(containerDomNode);

      DialogInfo[dialogId] = {};

      const container = document.getElementById(elementId);
      if (container) {
        const root = createRoot(container);
        root.render(
          <DialogComp
            id={id}
            getHandleCloseCustom={(value) => {
              DialogInfo[dialogId].closeCustom = value;
            }}
            getSheetVisibility={(value) => {
              DialogInfo[dialogId].visibility = value;
            }}
            getHandleClose={(value) => {
              DialogInfo[dialogId].close = value;
            }}
            getHandleOpen={(value) => {
              DialogInfo[dialogId].open = value;
            }}
            {...rest}
          />
        );
      }
    }
  },
  close: (options?: CloseProps) => {
    const dialogId = options?.id ?? "default";
    if (!DialogInfo[dialogId]?.visibility) return;

    if (options?.callback) {
      DialogInfo[dialogId]?.closeCustom?.(options.callback);
    } else {
      DialogInfo[dialogId]?.close?.();
    }
  },
  isOpen: (id?: string) => {
    const dialogId = id ?? "default";
    return DialogInfo[dialogId].visibility;
  },
};
