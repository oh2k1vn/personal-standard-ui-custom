/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Ripple from "react-ripplejs";
import { cn } from "utils/cn";
import { Button as Btn } from "react-aria-components";

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
    <Btn
      isDisabled={disabled}
      type={type}
      className={cn(
        "group focus-visible:outline-none focus-visible:ring-0 border-none"
      )}
      onPress={onClick}
    >
      <Ripple
        color={"white"}
        style={style}
        className={cn(
          "relative py-1.5 px-3 w-fit select-none rounded-md text-center bg-primary border border-transparent text-white cursor-pointer text-ellipsis",
          "group-data-[pressed]:scale-90 transition-all duration-300",
          className,
          {
            "cursor-not-allowed bg-disabled": disabled,
          }
        )}
      >
        {children}
      </Ripple>
    </Btn>
  );
};
