"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRIES } from "@/lib/currency";
import { useCurrency } from "@/lib/currency-context";

export function CountrySelector({ className = "" }) {
  const { country, setCountry } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change country or currency"
        aria-expanded={open}
        className="flex items-center gap-2 text-sm font-bold text-foreground"
      >
        <span aria-hidden="true">{country.flag}</span>
        <span className="hidden sm:inline">
          {country.name} ({country.currency} {country.symbol})
        </span>
        <ChevronDown size={12} />
      </button>

      {open && (
        <>
          <button
            aria-label="Close country selector"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-0 z-50 mt-3 max-h-80 w-64 overflow-y-auto rounded-xl border border-border bg-[#0a0a0a] py-2 shadow-xl">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCountry(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-white/5 ${
                  c.code === country.code ? "text-accent" : "text-foreground"
                }`}
              >
                <span aria-hidden="true">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-muted">{c.currency}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
