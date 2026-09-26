import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";

import { cn } from "../../lib/utils";
import { ToastContext } from "./toastContext";

const tones = {
  success: { icon: CheckCircle2, className: "text-brand-600" },
  error: { icon: TriangleAlert, className: "text-red-500" },
  info: { icon: Info, className: "text-sky-500" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message, tone = "success") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((current) => [...current, { id, message, tone }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), 3200),
      );
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-70 flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((item) => {
            const tone = tones[item.tone] ?? tones.success;
            const Icon = tone.icon;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-soft"
              >
                <Icon className={cn("h-5 w-5 shrink-0", tone.className)} />
                <p className="text-sm font-medium text-slate-700">{item.message}</p>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  className="ml-auto text-xs font-semibold text-slate-400 transition-colors hover:text-slate-700"
                >
                  Tutup
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
