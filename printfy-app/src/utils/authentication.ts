// ============================================
// AUTHENTICATION UTILITIES
// ============================================
import { CREDENTIALS } from "./constants";
import type { UserRole } from "./types";

export interface AuthResult {
  success: boolean;
  role?: UserRole;
  error?: string;
}

export function validateStudentLogin(name: string, password: string): AuthResult {
  if (!name.trim()) {
    return { success: false, error: "Please enter your name" };
  }
  if (password !== CREDENTIALS.STUDENT_PASSWORD) {
    return { success: false, error: "Incorrect password" };
  }
  return { success: true, role: "student" };
}

export function validateOperatorLogin(username: string, password: string): AuthResult {
  const usernames: readonly string[] = CREDENTIALS.OPERATOR_USERNAMES;
  if (!usernames.includes(username.toLowerCase())) {
    return { success: false, error: "Invalid operator username" };
  }
  if (password !== CREDENTIALS.OPERATOR_PASSWORD) {
    return { success: false, error: "Incorrect password" };
  }
  return { success: true, role: "operator" };
}

export function determineUserRole(username: string): UserRole {
  const usernames: readonly string[] = CREDENTIALS.OPERATOR_USERNAMES;
  if (usernames.includes(username.toLowerCase())) {
    return "operator";
  }
  return "student";
}

export function isOperatorUsername(username: string): boolean {
  const usernames: readonly string[] = CREDENTIALS.OPERATOR_USERNAMES;
  return usernames.includes(username.toLowerCase());
}