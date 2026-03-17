import React, { forwardRef, type SelectHTMLAttributes } from "react";
import type { OptionType } from "../types/option.type";

interface CustomSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  errorMessage?: string;
  options: OptionType[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required: boolean;
}

export const CustomSelect = forwardRef<
  HTMLSelectElement,
  CustomSelectProps
>(
  (
    {
      value,
      onChange,
      label,
      id,
      errorMessage,
      options,
      disabled,
      required = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 justify-start items-start w-full text-wrap">
        {label && (
          <label htmlFor={id} className={`text-blue-950 text-sm font-semibold ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}>
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            rounded-lg
            py-[10px]
            px-4
            w-full
            text-gray-800
            shadow-sm
            shadow-gray-300
            text-sm
            border
            border-gray-400
            focus:border-blue-950
            focus:outline-none
            bg-white
            disabled:bg-gray-200
            disabled:cursor-not-allowed
          `}
          {...rest}
        >
          <option value="">Selecione...</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {errorMessage && (
          <p className="text-red-500 text-wrap">{errorMessage}</p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";