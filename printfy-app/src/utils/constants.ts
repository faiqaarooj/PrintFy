// ============================================
// APP CONSTANTS
// ============================================

export const PRICING = {
  COLOR_PER_PAGE: 15,
  BW_PER_PAGE: 10,
  ONLINE_PAYMENT_FEE: 2,
} as const;

export const COLORS = {
  BACKGROUND: "#F8F7F4",
  PRIMARY: "#1A1A2E",
  ACCENT: "#A8C5B5",
  TEXT: "#1A1A1A",
  BORDER: "#EBEBEB",
} as const;

export const FONTS = {
  HEADING: "Plus Jakarta Sans, system-ui, sans-serif",
  BODY: "Inter, system-ui, sans-serif",
} as const;

export const ARRIVAL_TIMES = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
] as const;

export const ALLOWED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
} as const;

export const CREDENTIALS = {
  STUDENT_PASSWORD: "1234",
  OPERATOR_USERNAMES: ["operator", "admin"],
  OPERATOR_PASSWORD: "1234",
} as const;
