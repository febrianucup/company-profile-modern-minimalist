import { cn } from "../../lib/utils";

const controlBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/25 disabled:bg-slate-50";

export function Input({ className, invalid, ...props }) {
  return (
    <input
      className={cn(
        controlBase,
        invalid
          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
          : "border-slate-300 focus:border-brand-500",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, invalid, rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        controlBase,
        "resize-none",
        invalid
          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
          : "border-slate-300 focus:border-brand-500",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, invalid, children, ...props }) {
  return (
    <select
      className={cn(
        controlBase,
        "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
        "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%2364748b%22 stroke-width=%221.5%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')]",
        invalid
          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
          : "border-slate-300 focus:border-brand-500",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

/** Label + control + error message, in the consistent vertical rhythm. */
export function Field({ label, htmlFor, error, hint, required, children, className }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-xs font-semibold tracking-wide text-slate-700"
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}
