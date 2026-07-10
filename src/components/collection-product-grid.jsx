"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "most-relevant", label: "Most relevant" },
  { value: "best-selling", label: "Best selling" },
  { value: "title-ascending", label: "Alphabetically, A-Z" },
  { value: "title-descending", label: "Alphabetically, Z-A" },
  { value: "price-ascending", label: "Price, low to high" },
  { value: "price-descending", label: "Price, high to low" },
  { value: "created-ascending", label: "Date, old to new" },
  { value: "created-descending", label: "Date, new to old" },
];

function sortProducts(products, sortBy) {
  const list = [...products];
  switch (sortBy) {
    case "title-ascending":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "title-descending":
      return list.sort((a, b) => b.title.localeCompare(a.title));
    case "price-ascending":
      return list.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-descending":
      return list.sort((a, b) => Number(b.price) - Number(a.price));
    default:
      return list;
  }
}

export function CollectionProductGrid({ products }) {
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [pendingSort, setPendingSort] = useState("featured");
  const [pendingInStock, setPendingInStock] = useState(false);

  const activeFilterCount =
    (sortBy !== "featured" ? 1 : 0) + (inStockOnly ? 1 : 0);

  const sorted = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  const openDrawer = () => {
    setPendingSort(sortBy);
    setPendingInStock(inStockOnly);
    setOpen(true);
  };

  const apply = () => {
    setSortBy(pendingSort);
    setInStockOnly(pendingInStock);
    setOpen(false);
  };

  const pendingCount = (pendingSort !== "featured" ? 1 : 0) + (pendingInStock ? 1 : 0);

  return (
    <>
      <div className="mt-8 flex items-center justify-between border-y border-border py-3">
        <p className="text-sm text-muted">{products.length} products</p>
        <button
          onClick={openDrawer}
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No products found in this collection yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative flex h-full w-[85%] max-w-sm flex-col bg-[#0a0a0a]">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <p className="text-lg font-bold text-foreground">Filters</p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="mb-3 text-sm font-bold text-foreground">Sort by</p>
              <div className="flex flex-col gap-3">
                {SORT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <input
                      type="radio"
                      name="sort_by"
                      value={opt.value}
                      checked={pendingSort === opt.value}
                      onChange={() => setPendingSort(opt.value)}
                      className="h-4 w-4 accent-accent"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="text-sm font-bold text-foreground">In stock only</span>
                <button
                  role="switch"
                  aria-checked={pendingInStock}
                  onClick={() => setPendingInStock((v) => !v)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    pendingInStock ? "bg-accent" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      pendingInStock ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-border p-4">
              <button
                onClick={apply}
                className="w-full rounded-full bg-accent px-6 py-3.5 text-[15px] font-bold text-accent-foreground hover:bg-accent/90"
              >
                Apply{pendingCount > 0 ? ` (${pendingCount})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
