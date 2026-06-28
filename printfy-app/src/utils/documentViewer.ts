// ============================================
// DOCUMENT VIEWER UTILITIES
// ============================================

/**
 * Download a document from a data URL
 */
export function downloadDocument(url: string, fileName: string): void {
  if (url === "#" || !url || url.trim() === "") {
    alert("No document available for this job. This is a demo entry.");
    return;
  }

  // Create a temporary link element and trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Open a document in a new browser tab
 * Converts base64 data URL to Blob URL to bypass popup blockers
 */
export function openDocumentInBrowser(url: string, fileName: string): void {
  if (url === "#" || !url || url.trim() === "") {
    alert("No document available for this job. This is a demo entry.");
    return;
  }

  try {
    // Extract the base64 data and mime type
    const matches = url.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      alert("Invalid file format. Please download instead.");
      return;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Convert base64 to binary
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create Blob and Blob URL
    const blob = new Blob([bytes], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    // Open in new tab
    const newTab = window.open(blobUrl, "_blank");
    if (!newTab) {
      alert(
        "Could not open in new tab. Please check your browser settings or use Download button."
      );
      // Clean up the blob URL if failed
      URL.revokeObjectURL(blobUrl);
    } else {
      // Clean up the blob URL after a delay (give browser time to load it)
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    }
  } catch (error) {
    console.error("Error opening file:", error);
    alert("Could not open file. Please use the Download button instead.");
  }
}

/**
 * Check if a file is an image
 */
export function isImageFile(url: string): boolean {
  return url.startsWith("data:image/");
}

/**
 * Check if a file is a PDF
 */
export function isPdfFile(url: string): boolean {
  return url.startsWith("data:application/pdf");
}

/**
 * Get file type display name
 */
export function getFileTypeDisplayName(url: string): string {
  if (isImageFile(url)) return "Image";
  if (isPdfFile(url)) return "PDF";
  if (url.includes("application/msword")) return "Word Document";
  return "Document";
}
