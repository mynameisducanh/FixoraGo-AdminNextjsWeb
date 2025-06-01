import dayjs from "dayjs";
/**
 * Format number to Vietnamese currency format
 * @param amount - The number to format
 * @returns Formatted string (e.g. 13580000 -> "13.580.000")
 */
export const formatCurrency = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}; 

export const formatDateTimeVN = (
  value: string | number | Date | undefined
): string => {
  if (!value) return "Không xác định";

  // Nếu là chuỗi chứa toàn số, chuyển sang số để tránh parse sai
  if (typeof value === "string" && /^\d+$/.test(value)) {
    value = Number(value);
  }

  const date = dayjs(value);

  if (!date.isValid()) {
    console.log("❌ Không thể parse ngày:", value);
    return "Ngày không hợp lệ";
  }

  return date.format("HH:mm, DD/MM/YYYY");
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Không xác định";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Ngày không hợp lệ";

  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  });
};