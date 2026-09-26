import { motion, useReducedMotion } from "framer-motion";

import { cn } from "../../lib/utils";

/**
 * Scroll-into-view reveal used across the public pages.
 * Falls back to a plain wrapper when the user prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 20, amount = 0.25 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className }) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-600",
        className,
      )}
    >
      {children}
    </p>
  );
}
