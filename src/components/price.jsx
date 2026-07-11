"use client";

import { useCurrency } from "@/lib/currency-context";

// Renders a USD amount (the store's real currency) converted into the
// shopper's selected display currency.
export function Price({ amount, className }) {
  const { format } = useCurrency();
  if (amount == null) return null;
  return <span className={className}>{format(amount)}</span>;
}
