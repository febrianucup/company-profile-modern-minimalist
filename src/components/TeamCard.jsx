import { useState } from "react";
import { User } from "lucide-react";

import { cn } from "../lib/utils";

export function TeamCard({ name, role, image, className }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={cn("group w-56 shrink-0 sm:w-64", className)}>
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        {failed || !image ? (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <User className="h-12 w-12" />
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
          />
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-heading text-base font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </figcaption>
    </figure>
  );
}

export default TeamCard;
