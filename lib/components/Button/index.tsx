/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Ripple from "react-ripplejs";
import { cn } from "utils/cn";

interface ButtonProps {
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: any;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  className,
  disabled,
  children,
  onClick,
  style,
}) => {
  return (
    <Ripple
      onClick={disabled ? () => {} : onClick}
      color={"yellow"}
      style={style}
      className={cn(
        "relative py-2 px-3 w-fit select-none rounded-md text-center bg-primary border border-transparent text-white cursor-pointer text-text",
        className,
        {
          "opacity-50 cursor-not-allowed bg-disabled": disabled,
        }
      )}
    >
      <button
        disabled={disabled}
        type={type}
        className={cn(
          "w-full h-full text-sm flex justify-center items-center overflow-hidden line-clamp-1 m-0 p-0 "
        )}
        style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
      >
        {children}
      </button>
    </Ripple>
  );
};
