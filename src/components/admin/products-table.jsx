"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Pencil, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { authFetch } from "@/lib/auth";

const PAGE_SIZE = 20;

export function ProductsTable({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleDelete(handle) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(handle);
    try {
      await authFetch(`/api/products/${encodeURIComponent(handle)}/`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.handle !== handle));
    } catch (err) {
      alert(err.message || "Failed to delete product.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-foreground">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent/90"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5">
        <Search size={16} className="text-muted" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-160 text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs font-semibold uppercase text-muted">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((product) => (
              <tr key={product.handle} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-black">
                      {product.image && (
                        <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
                      )}
                    </div>
                    <span className="font-medium text-foreground line-clamp-2">
                      {product.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{product.vendor || "—"}</td>
                <td className="px-4 py-3 text-muted">
                  {product.price != null ? `$${product.price.toFixed(2)}` : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.handle}`}
                      aria-label="Edit"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-white/5 hover:text-foreground"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.handle)}
                      disabled={deleting === product.handle}
                      aria-label="Delete"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
