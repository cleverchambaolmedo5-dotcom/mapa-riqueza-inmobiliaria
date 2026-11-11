import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
};

export function Button({ children, fullWidth = false, className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn-primary group relative isolate inline-flex h-[3.25rem] items-center overflow-hidden tiny:h-12 justify-center gap-2.5 whitespace-nowrap rounded-xl bg-electric px-4 text-[0.8125rem] font-bold uppercase tracking-[0.02em] min-[400px]:text-[0.875rem] sm:px-7 sm:text-[0.9375rem] sm:tracking-[0.04em] text-white disabled:cursor-not-allowed disabled:opacity-70 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
