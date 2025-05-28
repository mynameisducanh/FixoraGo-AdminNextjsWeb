/**
 * Format number to Vietnamese currency format
 * @param amount - The number to format
 * @returns Formatted string (e.g. 13580000 -> "13.580.000")
 */
export const formatCurrency = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}; 