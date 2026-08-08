import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

const ProjectCard = React.forwardRef(
  (
    {
      className,
      imgSrc,
      title,
      description,
      link,
      linkText = "View Project",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white text-slate-900 shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl",
          className
        )}
        {...props}
      >
        {/* Card Image Section */}
        <div className="aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Card Content Section */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-slate-600">{description}</p>

          {/* Card Link/CTA */}
          <a
            href={link}
            target={link.startsWith('#') ? undefined : '_blank'}
            rel={link.startsWith('#') ? undefined : 'noopener noreferrer'}
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#2DB34F] transition-all duration-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1 text-[#2DB34F]" />
          </a>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export { ProjectCard };