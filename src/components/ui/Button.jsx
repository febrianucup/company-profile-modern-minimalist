import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
  outline:
    "border border-slate-300 bg-white text-slate-800 hover:border-brand-400 hover:text-brand-600",
  subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  danger: "bg-red-600 text-white shadow-sm hover:bg-red-700",
};

const sizes = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  className,
  type,
  ...props
}) {
  const Tag = as || (href ? "a" : "button");

  return (
    <Tag
      href={href}
      type={Tag === "button" ? (type ?? "button") : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
