import React from "react";
import { cn } from "utils/cn";

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProp>(
  ({ ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(
          "text-black flex h-11 w-full rounded-md border bg-transparent pl-3 pr-7 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
      />
    );
  }
);
