/**
 * Client-side image handling for the admin forms.
 *
 * There is no backend, so a photo picked from the device is downscaled in the
 * browser and stored as a JPEG data URL inside the local store. Aiming for
 * ~100-200 KB per photo keeps the localStorage budget (≈5 MB) comfortable.
 */

const MAX_DIMENSION = 720;
const QUALITY = 0.72;

async function loadBitmap(file) {
  if ("createImageBitmap" in window) {
    try {
      // Preserves EXIF orientation where supported.
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // fall through to the <img> path
    }
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gambar tidak bisa dibaca."));
    };
    image.src = url;
  });
}

/**
 * Reads an image File, downscales it to fit `maxDimension` and returns a JPEG
 * data URL plus its metadata.
 */
export async function fileToOptimizedDataUrl(
  file,
  { maxDimension = MAX_DIMENSION, quality = QUALITY } = {},
) {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("File harus berupa gambar (JPG, PNG, atau WebP).");
  }

  const bitmap = await loadBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  // White background so transparent PNGs don't turn black in JPEG.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const dataUrl = canvas.toDataURL("image/jpeg", quality);

  return { dataUrl, width, height, bytes: estimateBytes(dataUrl) };
}

/** Approximate decoded size of a data URL, in bytes. */
export function estimateBytes(dataUrl) {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Math.round((base64.length * 3) / 4);
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isDataUrl(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}
