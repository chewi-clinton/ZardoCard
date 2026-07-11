"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Pencil, Trash2, Plus, ImageOff } from "lucide-react";
import { authFetch } from "@/lib/auth";

export function CategoriesTable({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories.filter((c) => c.title.toLowerCase().includes(q));
  }, [categories, query]);

  async function handleDelete(handle) {
    if (!confirm("Delete this category? This cannot be undone.")) return;
    setDeleting(handle);
    try {
      await authFetch(`/api/categories/${encodeURIComponent(handle)}/`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c.handle !== handle));
    } catch (err) {
      alert(err.message || "Failed to delete category.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-foreground">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent/90"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5">
        <Search size={16} className="text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search categories..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-160 text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs font-semibold uppercase text-muted">
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Handle</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((category) => (
              <tr key={category.handle} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-black">
                      {category.bannerImage ? (
                        <Image src={category.bannerImage} alt="" fill sizes="48px" className="object-cover" />
                      ) : (
                        <ImageOff size={16} className="text-muted" />
                      )}
                    </div>
                    <span className="font-medium text-foreground line-clamp-2">
                      {category.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{category.handle}</td>
                <td className="px-4 py-3 text-muted">{category.productCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/categories/${category.handle}`}
                      aria-label="Edit"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-white/5 hover:text-foreground"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(category.handle)}
                      disabled={deleting === category.handle}
                      aria-label="Delete"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-muted">
        {filtered.length} categor{filtered.length === 1 ? "y" : "ies"}
      </p>
    </div>
  );
}
