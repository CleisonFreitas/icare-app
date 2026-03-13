import type { JSX } from "react";

type ButtonLoadingProps = {
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  icon?: JSX.Element;
};

export const ButtonLoading = ({ isLoading, children, disabled, size, icon }: ButtonLoadingProps) => {
  const sizesAvaible = {
    small: "h-9",
    medium: "h-12",
    large: "h-14"
  };
  return (
    <button
      disabled={isLoading || disabled == true}
      className={`
        relative
        flex
        items-center
        justify-center
        rounded-lg
        bg-gray-600
        text-white
        text-md
        w-full
        p-4
        disabled:opacity-70
        h-
        ${sizesAvaible[size || "large"]}
      `}
    >
      {isLoading && (
        <div className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      <span className={isLoading ? "opacity-0" : "opacity-100" + " flex items-center gap-2"}>
        {icon}
        {children}
      </span>
    </button>
  );
};
