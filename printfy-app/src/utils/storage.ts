// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

import type { PrintJob } from "./types";

const STORAGE_KEYS = {
  QUEUE: "printQueue",
  USER: "currentUser",
} as const;

/**
 * Save the print queue to localStorage
 */
export function saveQueueToStorage(queue: PrintJob[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(queue));
  } catch (error) {
    console.error("Error saving queue to localStorage:", error);
  }
}

/**
 * Load the print queue from localStorage
 */
export function loadQueueFromStorage(): PrintJob[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUEUE);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading queue from localStorage:", error);
  }
  return [];
}

/**
 * Clear the print queue from localStorage
 */
export function clearQueueFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.QUEUE);
  } catch (error) {
    console.error("Error clearing queue from localStorage:", error);
  }
}

/**
 * Save current user to localStorage
 */
export function saveUserToStorage(user: { name: string; role: string }): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
}

/**
 * Load current user from localStorage
 */
export function loadUserFromStorage(): { name: string; role: string } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
  }
  return null;
}

/**
 * Clear current user from localStorage
 */
export function clearUserFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error("Error clearing user from localStorage:", error);
  }
}
