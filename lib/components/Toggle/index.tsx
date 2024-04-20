import React from "react";

interface ToggleProp extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProp>(
  ({ className, ...props }, ref) => {
    return (
      <label className="flex items-center relative w-max cursor-pointer select-none">
        <input
          ref={ref}
          type="checkbox"
          className={`appearance-none peer transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary bg-gray-300 shadow border border-gray-300 checked:bg-primary ${className}`}
          {...props}
        />
        {/* <span className="absolute font-medium text-xs uppercase right-1 text-white">
          OFF
        </span>
        <span className="absolute font-medium text-xs uppercase right-8 text-white">
          ON
        </span> */}
        <span
          className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200  peer-checked:translate-x-7 ${className}`}
        />
      </label>
    );
  }
);
