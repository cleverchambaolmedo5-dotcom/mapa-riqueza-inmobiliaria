import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  /** Elemento a la izquierda del campo (p. ej. selector de código de país). */
  leading?: ReactNode;
};

export function Input({ id, label, error, leading, className = "", ...props }: InputProps) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[0.8125rem] font-semibold text-ink">
        {label}
      </label>
      <div
        className={`field-shell flex h-12 items-stretch tiny:h-11 overflow-hidden rounded-xl border bg-white transition-[border-color,box-shadow] duration-200 ${
          hasError
            ? "border-danger shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
            : "border-field focus-within:border-electric focus-within:shadow-[0_0_0_3px_rgba(23,100,255,0.14)]"
        }`}
      >
        {leading}
        <input
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`min-w-0 flex-1 bg-transparent px-4 text-base text-ink outline-none placeholder:text-placeholder ${className}`}
          {...props}
        />
      </div>
      <p
        id={errorId}
        role={hasError ? "alert" : undefined}
        className={`min-h-4 text-[0.8125rem] leading-4 text-danger short:min-h-0 ${hasError ? "" : "invisible"}`}
      >
        {error}
      </p>
    </div>
  );
}
