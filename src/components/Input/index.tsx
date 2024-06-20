import React from "react";
import { cn } from "../../main";

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProp>(
  ({ onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          className={cn(
            "text-black flex h-11 w-full rounded-md border bg-transparent pl-3 pr-7 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            props.className
          )}
        />
        {onClear && (
          <svg
            onClick={onClear}
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 size-4 transition-all cursor-pointer text-gray-400",
              {
                "opacity-100": props.value,
                "opacity-0": !props.value,
              }
            )}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
            />
          </svg>
        )}
      </div>
    );
  }
);
export default Input;
