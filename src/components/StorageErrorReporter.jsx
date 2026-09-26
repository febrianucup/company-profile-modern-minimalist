import { useEffect } from "react";

import { useToast } from "./ui/toastContext";

/**
 * Warns the admin when localStorage rejects a write (quota exceeded after
 * uploading too many photos, or storage disabled in the browser).
 */
export function StorageErrorReporter() {
  const toast = useToast();

  useEffect(() => {
    const handleError = () => {
      toast(
        "Penyimpanan browser penuh. Hapus beberapa foto yang di-upload lalu simpan lagi.",
        "error",
      );
    };
    window.addEventListener("bomber:storage-error", handleError);
    return () => window.removeEventListener("bomber:storage-error", handleError);
  }, [toast]);

  return null;
}

export default StorageErrorReporter;
