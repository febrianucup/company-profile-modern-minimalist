import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./Button";

const sizes = {
  sm: "sm:max-w-md",
  md: "sm:max-w-xl",
  lg: "sm:max-w-3xl",
};

export function Modal({ open, onClose, title, description, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/50"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-soft sm:rounded-2xl",
              sizes[size],
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="font-heading text-lg font-semibold text-slate-900">{title}</h2>
                {description && (
                  <p className="mt-0.5 text-sm text-slate-500">{description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {footer && (
              <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ConfirmDialog({
  open,
  title = "Hapus data ini?",
  message = "Tindakan ini tidak bisa dibatalkan.",
  confirmLabel = "Hapus",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-slate-600">{message}</p>
    </Modal>
  );
}
