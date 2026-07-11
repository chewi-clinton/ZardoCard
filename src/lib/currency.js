export const COUNTRIES = [
  { code: "US", name: "United States", currency: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "$", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "$", flag: "🇦🇺" },
  { code: "DE", name: "Germany", currency: "EUR", symbol: "€", flag: "🇩🇪" },
  { code: "FR", name: "France", currency: "EUR", symbol: "€", flag: "🇫🇷" },
  { code: "JP", name: "Japan", currency: "JPY", symbol: "¥", flag: "🇯🇵" },
  { code: "IE", name: "Ireland", currency: "EUR", symbol: "€", flag: "🇮🇪" },
  { code: "NL", name: "Netherlands", currency: "EUR", symbol: "€", flag: "🇳🇱" },
  { code: "ES", name: "Spain", currency: "EUR", symbol: "€", flag: "🇪🇸" },
  { code: "IT", name: "Italy", currency: "EUR", symbol: "€", flag: "🇮🇹" },
  { code: "NZ", name: "New Zealand", currency: "NZD", symbol: "$", flag: "🇳🇿" },
  { code: "MX", name: "Mexico", currency: "MXN", symbol: "$", flag: "🇲🇽" },
  { code: "SG", name: "Singapore", currency: "SGD", symbol: "$", flag: "🇸🇬" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

const RATES_CACHE_KEY = "zc_exchange_rates";
const RATES_CACHE_MS = 24 * 60 * 60 * 1000; // 24h

export async function fetchRates() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(RATES_CACHE_KEY) || "null");
    if (cached && Date.now() - cached.fetchedAt < RATES_CACHE_MS) {
      return cached.rates;
    }
  } catch {
    // ignore corrupt cache
  }

  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("Failed to fetch exchange rates");
  const data = await res.json();
  if (data.result !== "success") throw new Error("Exchange rate API error");

  window.localStorage.setItem(
    RATES_CACHE_KEY,
    JSON.stringify({ rates: data.rates, fetchedAt: Date.now() })
  );
  return data.rates;
}

// amountUsd -> converted number, using a rates map from fetchRates()
export function convertFromUsd(amountUsd, currencyCode, rates) {
  if (!rates || currencyCode === "USD") return Number(amountUsd);
  const rate = rates[currencyCode];
  if (!rate) return Number(amountUsd);
  return Number(amountUsd) * rate;
}

export function formatMoney(amount, country) {
  const decimals = country.currency === "JPY" ? 0 : 2;
  return `${country.symbol}${amount.toFixed(decimals)}`;
}
