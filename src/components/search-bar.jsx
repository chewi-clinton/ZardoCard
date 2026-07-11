"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { searchProducts, toCardProduct } from "@/lib/catalog";
import { Price } from "@/components/price";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setSuggestions([]);
      setActiveIndex(-1);
    }
  }, [open]);

  // Debounced live search: fires ~250ms after the user stops typing so we
  // don't spam the API on every keystroke.
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      searchProducts(q, { pageSize: 6 })
        .then((results) => setSuggestions(results.map(toCardProduct)))
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  function goToProduct(handle) {
    router.push(`/products/${handle}`);
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      goToProduct(suggestions[activeIndex].handle);
      return;
    }
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const trimmedQuery = query.trim();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
        aria-label="Search"
      >
        <Search size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-x-hidden bg-black/70 px-[5px] pt-28 sm:px-4 sm:pt-32">
          <button
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="absolute inset-0"
          />
          <div className="relative flex w-full max-w-xl min-w-0 flex-col">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-full border border-border bg-[#0a0a0a] px-5 py-3.5"
            >
              <Search size={18} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                // text-base (16px) instead of text-sm on purpose: iOS Safari
                // auto-zooms the whole page in when focusing an input with a
                // computed font-size under 16px, and doesn't reliably zoom
                // back out, which looks like the page "expanding" and
                // becoming horizontally scrollable.
                className="w-full min-w-0 bg-transparent text-base text-foreground placeholder:text-muted focus:outline-none"
              />
              {loading && <Loader2 size={16} className="shrink-0 animate-spin text-muted" />}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="shrink-0 text-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            </form>

            {trimmedQuery && (
              <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border border-border bg-[#0a0a0a] p-2">
                {suggestions.map((product, i) => (
                  <button
                    key={product.handle}
                    type="button"
                    onClick={() => goToProduct(product.handle)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-xl p-2 text-left ${
                      i === activeIndex ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-black">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {product.title}
                      </p>
                      <p className="text-xs text-muted">
                        <Price amount={Number(product.price)} />
                      </p>
                    </div>
                  </button>
                ))}

                {!loading && suggestions.length === 0 && (
                  <p className="px-3 py-4 text-center text-sm text-muted">No products found.</p>
                )}

                {suggestions.length > 0 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(trimmedQuery)}`}
                    onClick={() => setOpen(false)}
                    className="mt-1 block rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-accent hover:bg-white/5"
                  >
                    See all results for &quot;{trimmedQuery}&quot;
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
