import { motion, useReducedMotion } from "framer-motion";

import { cn } from "../lib/utils";

/**
 * Vertical process timeline rendered from the "services" collection.
 */
export function Timeline({ items, className }) {
  const reduceMotion = useReducedMotion();

  if (!items?.length) return null;

  return (
    <ol className={cn("relative space-y-8 border-l border-slate-200 pl-8", className)}>
      {items.map((item, index) => {
        const content = (
          <>
            <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-500 bg-white">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            <h3 className="font-heading text-base font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </>
        );

        if (reduceMotion) {
          return (
            <li key={item.id} className="relative">
              {content}
            </li>
          );
        }

        return (
          <motion.li
            key={item.id}
            className="relative"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {content}
          </motion.li>
        );
      })}
    </ol>
  );
}

export default Timeline;
