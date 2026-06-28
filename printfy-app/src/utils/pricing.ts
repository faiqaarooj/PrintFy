// ============================================
// PRICING CALCULATION UTILITIES
// ============================================

import { PRICING } from "./constants";

export interface PricingBreakdown {
  subtotal: number;
  paymentMethodFee: number;
  total: number;
}

/**
 * Calculate the cost of a print job
 */
export function calculatePrintCost(
  pages: number,
  copies: number,
  color: "bw" | "color",
  paymentMethod: "online" | "cash" = "cash"
): PricingBreakdown {
  const pricePerPage = color === "color" ? PRICING.COLOR_PER_PAGE : PRICING.BW_PER_PAGE;
  const subtotal = pages * copies * pricePerPage;
  const paymentMethodFee = paymentMethod === "online" ? PRICING.ONLINE_PAYMENT_FEE : 0;
  const total = subtotal + paymentMethodFee;

  return {
    subtotal,
    paymentMethodFee,
    total,
  };
}

/**
 * Format currency in Pakistani Rupees
 */
export function formatCurrency(amount: number): string {
  return `Rs. ${amount}`;
}

/**
 * Get price per page based on color option
 */
export function getPricePerPage(color: "bw" | "color"): number {
  return color === "color" ? PRICING.COLOR_PER_PAGE : PRICING.BW_PER_PAGE;
}

/**
 * Calculate total pages for a job
 */
export function calculateTotalPages(pages: number, copies: number): number {
  return pages * copies;
}
