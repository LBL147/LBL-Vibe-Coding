import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  const baseClasses =
    "rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-card backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl";

  return <div className={[baseClasses, className].filter(Boolean).join(" ")}>{children}</div>;
};
