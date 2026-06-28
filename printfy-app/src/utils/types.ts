// ============================================
// TYPE DEFINITIONS
// ============================================

export interface PrintJob {
  id: number;
  position: number;
  studentName: string;
  fileName: string;
  documentUrl: string;
  pages: number;
  copies: number;
  color: "bw" | "color";
  binding: boolean;
  arrivalTime: string;
  submittedAt: number;
  status: "waiting" | "printing" | "done";
  paymentMethod?: "online" | "cash";
}

export interface UploadedFile {
  file: File;
  fileName: string;
  pages: number;
  dataUrl: string;
}

export type UserRole = "student" | "operator";

export interface User {
  name: string;
  role: UserRole;
}
