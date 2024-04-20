import React from "react";
import { useRippling } from "../../hooks/useRippling.ts";

export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  const { children, onClick, ...rest } = props;

  const { x, y, handleRippleOnClick, isRippling } = useRippling();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleRippleOnClick(e);
    onClick && onClick(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative overflow-hidden bg-primary text-white font-medium py-2 px-4 rounded inline-flex items-center justify-center shadow-sm hover:cursor-pointer"
      {...rest}
    >
      <span className="z-10">{children}</span>
      {isRippling && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-transparent">
          <span
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 w-0 h-0 rounded-full bg-white bg-opacity-50 animate-ripple"
            style={{
              left: x,
              top: y,
            }}
          />
        </div>
      )}
    </button>
  );
};
