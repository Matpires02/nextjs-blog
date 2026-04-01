import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;
export function InputText({ labelText, ...props }: InputTextProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "bg-white",
          "outline-0",
          "ring-2",
          "ring-slate-400",
          "rounded",
          "p-2",
          "text-slate-600",
          "transition",
          "focus:ring-blue-600",
          "placeholder-slate-400",
          "disabled:bg-slate-200 disabled:placeholder-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed",
          "read-only:bg-slate-200 read-only:placeholder-slate-400",
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
