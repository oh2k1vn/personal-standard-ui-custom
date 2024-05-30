/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Ripple from "react-ripplejs";
import cn from "utils/cn";

interface ButtonProps {
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: any;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  disabled,
  children,
  onClick,
  style,
}) => {
  const handleOnclick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <Ripple
      onClick={handleOnclick}
      className={cn(
        "w-full bg-primary rounded-md py-2 px-3 cursor-pointer select-none border border-transparent text-white",
        className,
        {
          "cursor-not-allowed opacity-70": disabled,
        }
      )}
      style={style}
    >
      <button
        onClick={handleOnclick}
        type={type}
        className="m-0 p-0 line-clamp-1 size-full"
        style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
      >
        {children}
      </button>
    </Ripple>
  );
};
export default Button;
