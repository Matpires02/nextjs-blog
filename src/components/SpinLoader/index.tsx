import clsx from "clsx";

type SpinLoaderProps = {
  containerClasses?: string;
};

export default function SpinLoader({
  containerClasses: containerClasses,
}: SpinLoaderProps) {
  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "justify-center",
        containerClasses,
      )}
    >
      <div
        className={clsx(
          "w-10",
          "h-10",
          "border-5",
          "border-t-transparent",
          "border-slate-900",
          "rounded-full",
          "animate-spin",
          "dark:border-slate-300",
          "dark:border-t-transparent",
        )}
      ></div>
    </div>
  );
}
