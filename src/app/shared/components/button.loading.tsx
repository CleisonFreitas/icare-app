type ButtonLoadingProps = {
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export const ButtonLoading = ({ isLoading, children, disabled }: ButtonLoadingProps) => {
  return (
    <button
      disabled={isLoading || disabled == true}
      className="relative flex items-center justify-center rounded-lg bg-blue-950 text-white text-md w-full p-4 disabled:opacity-70"
    >
      {isLoading && (
        <div className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      <span className={isLoading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
    </button>
  );
};
