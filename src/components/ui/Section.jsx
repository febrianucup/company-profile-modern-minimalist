import { cn } from "../../lib/utils";
import { Eyebrow } from "./Reveal";

export function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
  );
}

/** Admin page header: title on the left, actions on the right. */
export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-14 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-card">
          <Icon className="h-5 w-5 text-slate-400" />
        </div>
      )}
      <h3 className="font-heading text-base font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
