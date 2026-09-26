import { createContext, useContext } from "react";

/** Shared with <ToastProvider> (Toast.jsx) so pages can push toasts. */
export const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context.toast;
}
