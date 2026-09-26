import { cn } from "../lib/utils";

/**
 * Info card used for the Vision / Mission block on the About section.
 * `icon` is a rendered SVG node (heroicons path), `title` and `description` text.
 */
export function Card({ icon, title, description, className }) {
  return (
    <div
      className={cn(
        "flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-soft",
        className,
      )}
    >
      {icon && (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          {icon}
        </div>
      )}
      <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

export default Card;
