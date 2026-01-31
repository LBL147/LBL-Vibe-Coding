import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  className?: string;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:scale-105";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-text-main shadow-lg shadow-primary/30 hover:bg-indigo-400 focus-visible:outline-primary",
  outline:
    "border border-slate-600 text-text-main bg-transparent hover:border-primary/70 focus-visible:outline-slate-500",
};

export const Button = ({
  children,
  variant = "primary",
  href,
  className,
}: ButtonProps) => {
  const combined = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={combined}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={combined}>
      {children}
    </button>
  );
};
