"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

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
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full max-w-xl min-w-0 items-center gap-2 rounded-full border border-border bg-[#0a0a0a] px-5 py-3.5"
          >
            <Search size={18} className="shrink-0 text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close search"
              className="shrink-0 text-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
