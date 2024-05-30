import React from "react";
import { Switch } from "react-aria-components";

interface ToggleProp {
  onChange?: (e: boolean) => void;
  value?: boolean;
  disabled?: boolean;
  label?: string;
}

const Toggle: React.FC<ToggleProp> = ({ onChange, value, disabled, label }) => {
  return (
    <Switch
      isDisabled={disabled}
      isSelected={value}
      onChange={onChange}
      className="inline-flex group"
    >
      <div className="w-10 h-6 bg-[#b9bdc1] rounded-full border-2 border-transparent group-data-[selected]:bg-primary transition-all duration-300">
        <div className="size-5 group-data-[pressed]:w-6 group-data-[selected]:group-data-[pressed]:ml-3 bg-white rounded-full group-data-[selected]:ml-4 transition-all duration-300 shadow"></div>
      </div>
      {label}
    </Switch>
  );
};
export default Toggle;
