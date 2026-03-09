type LoadingOverlayProps = {
  text?: string;
};

export const LoadingOverlay = ({ text }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      {text && (
        <p className="text-white mt-4 text-lg font-medium">
          {text}
        </p>
      )}
    </div>
  );
};
