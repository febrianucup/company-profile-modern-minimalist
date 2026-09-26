import { useState } from "react";
import { ArrowRight, ImageIcon } from "lucide-react";

import { cn } from "../lib/utils";

export function ProjectCard({ title, description, image, link, linkText = "Lihat proyek", className }) {
  const [failed, setFailed] = useState(false);
  const external = link && !link.startsWith("#") && !link.startsWith("/");

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft",
        className,
      )}
    >
      <div className="aspect-video overflow-hidden bg-slate-100">
        {failed || !image ? (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <ImageIcon className="h-8 w-8" />
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>

        {link && (
          <a
            href={link}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
