// ============================================
// FILE HANDLING UTILITIES
// ============================================

/**
 * Estimate the number of pages based on file type and size
 */
export function estimatePageCount(file: File): number {
  const fileType = file.type.toLowerCase();
  const fileSizeKB = file.size / 1024;

  if (fileType === "application/pdf") {
    // PDFs: ~100KB per page on average
    return Math.max(1, Math.ceil(fileSizeKB / 100));
  } else if (
    fileType === "application/msword" ||
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // Word docs: ~50KB per page on average
    return Math.max(1, Math.ceil(fileSizeKB / 50));
  } else if (fileType.startsWith("image/")) {
    // Images: 1 page per image
    return 1;
  }

  // Default fallback
  return Math.max(1, Math.ceil(fileSizeKB / 100));
}

/**
 * Convert a File to a base64 data URL
 */
export function convertFileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to data URL"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Validate file type
 */
export function isValidFileType(file: File): boolean {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  return allowedTypes.includes(file.type);
}

/**
 * Get file extension from filename
 */
export function getFileExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

/**
 * Format file size to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
