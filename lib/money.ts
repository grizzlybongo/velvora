import { STORE_CURRENCY, MONEY_SCALE, PRICE_LOCALE } from "@/lib/config/store";

const formatter = new Intl.NumberFormat(PRICE_LOCALE, {
  style: "currency",
  currency: STORE_CURRENCY,
  minimumFractionDigits: MONEY_SCALE,
  maximumFractionDigits: MONEY_SCALE,
});

/**
 * Format a numeric or decimal-string amount in the store currency.
 * Performs formatting only — no arithmetic.
 */
export function formatPrice(value: string | number): string {
  const num = typeof value === "string" ? Number(value) : value;
  return formatter.format(num);
}
