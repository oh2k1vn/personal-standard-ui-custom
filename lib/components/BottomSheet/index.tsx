import { createRoot } from "react-dom/client";
import BottomSheetComp from "./component";
import * as T from "./types";

const sheetInfo: T.SheetInfo = {
  default: {
    visibility: undefined,
    open: undefined,
    close: undefined,
    closeCustom: undefined,
  },
};

export const BottomSheet = {
  create: ({
    dragHandle = ["header", "mask"],
    maskClosable = true,
    id,
    ...rest
  }: T.Create) => {
    const sheetId = id ?? "default";
    const elementId = `bottom-sheet-${sheetId}`;
    if (typeof window !== "undefined") {
      document?.getElementById?.(elementId)?.remove();
      const containerDomNode = document.createElement("div");
      containerDomNode.setAttribute("id", elementId);
      document?.body.appendChild(containerDomNode);

      sheetInfo[sheetId] = {};

      const container = document.getElementById(elementId);
      if (container) {
        const root = createRoot(container);
        root.render(
          <BottomSheetComp
            id={id}
            dragHandle={dragHandle}
            maskClosable={maskClosable}
            getHandleCloseCustom={(value) => {
              sheetInfo[sheetId].closeCustom = value;
            }}
            getSheetVisibility={(value) => {
              sheetInfo[sheetId].visibility = value;
            }}
            getHandleClose={(value) => {
              sheetInfo[sheetId].close = value;
            }}
            getHandleOpen={(value) => {
              sheetInfo[sheetId].open = value;
            }}
            {...rest}
          />
        );
      }
    }
  },
  close: (options?: T.CloseOptions) => {
    const sheetId = options?.id ?? "default";
    if (!sheetInfo[sheetId]?.visibility) return;

    if (options?.callback) {
      sheetInfo[sheetId]?.closeCustom?.(options.callback);
    } else {
      sheetInfo[sheetId]?.close?.();
    }
  },
  isOpen: (id?: string) => {
    const sheetId = id ?? "default";
    return sheetInfo[sheetId].visibility;
  },
};
