/* eslint-disable @typescript-eslint/no-explicit-any */
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

const useDialog = (ref: any) => {
  const open = (data: IDialogProps) => {
    ref.current?.open(data);
  };

  const close = () => {
    ref?.current?.close();
  };

  return { open, close };
};
export default useDialog;
