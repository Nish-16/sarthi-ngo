import { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50",
  secondary:
    "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50",
  outline:
    "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",
  ghost: "text-slate-700 hover:text-indigo-600 hover:bg-indigo-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer";
  const styles = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    const isInternalRoute = href.startsWith("/");

    if (isInternalRoute) {
      return (
        <Link href={href} className={styles}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
