"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, fetchRates, convertFromUsd, formatMoney } from "@/lib/currency";

const CurrencyContext = createContext(null);
const STORAGE_KEY = "zc_country";

export function CurrencyProvider({ children }) {
  const [country, setCountryState] = useState(DEFAULT_COUNTRY);
  const [rates, setRates] = useState(null);

  useEffect(() => {
    try {
      const savedCode = window.localStorage.getItem(STORAGE_KEY);
      const saved = COUNTRIES.find((c) => c.code === savedCode);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCountryState(saved);
    } catch {
      // ignore
    }
    fetchRates()
      .then(setRates)
      .catch(() => setRates(null));
  }, []);

  function setCountry(code) {
    const next = COUNTRIES.find((c) => c.code === code);
    if (!next) return;
    setCountryState(next);
    window.localStorage.setItem(STORAGE_KEY, code);
  }

  function convert(amountUsd) {
    return convertFromUsd(amountUsd, country.currency, rates);
  }

  function format(amountUsd) {
    return formatMoney(convert(amountUsd), country);
  }

  return (
    <CurrencyContext.Provider value={{ country, setCountry, convert, format, ratesLoaded: Boolean(rates) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
