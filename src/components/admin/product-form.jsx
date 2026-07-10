"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ImageOff } from "lucide-react";
import { htmlToText } from "@/lib/html";

const inputClass =
  "rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent";

export function ProductForm({ product }) {
  const router = useRouter();
  const isEditing = Boolean(product);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: product?.title ?? "",
    vendor: product?.vendor ?? "ZardoCards",
    price: product?.price != null ? String(product.price) : "",
    compareAtPrice: product?.compareAtPrice != null ? String(product.compareAtPrice) : "",
    description: htmlToText(product?.bodyHtml),
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      router.push("/admin/products");
    }, 400);
  }

  function handleDelete() {
    if (!confirm("Delete this product?")) return;
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-foreground">
          {isEditing ? "Edit Product" : "Add Product"}
        </h1>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={15} />
            Delete
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
              className={inputClass}
            />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={8}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price">
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Compare-at price">
              <input
                type="number"
                step="0.01"
                value={form.compareAtPrice}
                onChange={(e) => update("compareAtPrice", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Vendor">
            <input
              value={form.vendor}
              onChange={(e) => update("vendor", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-5">
          <Field label="Image">
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
              {product?.images?.[0] ? (
                <Image
                  src={product.localImage}
                  alt=""
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageOff className="text-muted" size={28} />
              )}
            </div>
          </Field>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
        </button>
        <p className="text-xs text-muted">Not connected to a backend yet — nothing persists.</p>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}
