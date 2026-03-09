import React, { forwardRef, type InputHTMLAttributes } from "react";

interface CustomInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  errorMessage?: string;
  textPosition?: "left" | "right" | "center";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      value,
      onChange,
      label,
      id,
      placeholder,
      errorMessage,
      textPosition = "left",
      maxLength = 255,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 justify-start items-start">
        <label htmlFor={id} className="text-blue-950 text-lg">
          {label}
        </label>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          id={id}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`
            rounded-lg
            p-3
            w-full
            text-blue-950
            shadow-sm
            shadow-gray-300 
            text-lg
            border
            border-gray-400
            focus:border-blue-950
            focus:outline-none
            text-${textPosition}
          `}
          {...rest}
        />

        {errorMessage && (
          <p className="text-red-500 text-wrap">{errorMessage}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";