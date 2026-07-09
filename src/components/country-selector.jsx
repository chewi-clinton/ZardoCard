import { ChevronDown } from "lucide-react";

export function CountrySelector({ className = "" }) {
  return (
    <button
      type="button"
      aria-label="Change country or currency"
      className={`flex items-center gap-2 text-sm font-bold text-foreground ${className}`}
    >
      <span aria-hidden="true">🇺🇸</span>
      <span className="hidden sm:inline">United States (USD $)</span>
      <ChevronDown size={12} />
    </button>
  );
}
