import React from "react";

interface CheckboxProp extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProp>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={`relative rounded border-gray-400 after:border-r-[0.20em] after:border-b-[0.20em] size-5 aspect-square !appearance-none !bg-none checked:!bg-primary bg-white border shadow-sm  !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-primary hover:!border-primary cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-primary/30 focus-visible:border-primary after:w-[35%] after:h-[60%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)]  after:border-r-white  after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45 ${className}`}
        {...props}
      />
    );
  }
);
export default Checkbox;
