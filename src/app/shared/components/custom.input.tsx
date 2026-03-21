import React, { forwardRef, type InputHTMLAttributes } from "react";
import { Loading } from "./small.loading";

interface CustomInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  errorMessage?: string;
  textPosition?: "left" | "right" | "center";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
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
      required = false,
      isLoading = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 justify-start items-start">
        <span className="flex justify-start gap-2">
          <label htmlFor={id} className={`text-blue-950 text-sm font-semibold ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}>
            {label}
          </label>
          {isLoading && <Loading size={'sm'} />}
        </span>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          id={id}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          className={`
            rounded-lg
            py-2
            px-4
            w-full
            text-sm
            text-gray-800
            shadow-sm
            shadow-gray-300 
            border
            border-gray-400
            focus:border-blue-950
            focus:outline-none
            text-${textPosition}
          `}
          {...rest}
        />

        {errorMessage && (
          <p className="text-red-500 text-wrap text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";