type LoadingProps = {
  className?: string;
};

export const Loading = ({ className }: LoadingProps) => {
  const isDark = localStorage.theme === "dark";

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center ${
        isDark ? "bg-gray-800" : "bg-white"
      } ${className || ""}`}
    >
      <span className="loading loading-spinner w-20"></span>
    </div>
  );
};
