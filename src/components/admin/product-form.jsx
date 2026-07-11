"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ImageOff } from "lucide-react";
import { htmlToText } from "@/lib/html";
import { authFetch } from "@/lib/auth";

const inputClass =
  "rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({ product }) {
  const router = useRouter();
  const isEditing = Boolean(product);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image ?? null);
  const [form, setForm] = useState({
    title: product?.title ?? "",
    vendor: product?.vendor ?? "ZardoCards",
    price: product?.price != null ? String(product.price) : "",
    compareAtPrice: product?.compareAtPrice != null ? String(product.compareAtPrice) : "",
    description: htmlToText(product?.description),
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const body = new FormData();
    body.append("title", form.title);
    body.append("description", form.description);
    body.append("vendor", form.vendor);
    body.append("price", form.price || "0");
    if (form.compareAtPrice) body.append("compare_at_price", form.compareAtPrice);
    if (!isEditing) body.append("handle", slugify(form.title));
    if (imageFile) body.append("image", imageFile);

    try {
      const path = isEditing
        ? `/api/products/${encodeURIComponent(product.handle)}/`
        : "/api/products/";
      await authFetch(path, { method: isEditing ? "PATCH" : "POST", body, isFormData: true });
      router.push("/admin/products");
    } catch (err) {
      setError(err.message || "Failed to save product.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      await authFetch(`/api/products/${encodeURIComponent(product.handle)}/`, {
        method: "DELETE",
      });
      router.push("/admin/products");
    } catch (err) {
      alert(err.message || "Failed to delete product.");
    }
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
                required
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
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt=""
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                  unoptimized={imagePreview.startsWith("blob:")}
                />
              ) : (
                <ImageOff className="text-muted" size={28} />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 text-xs text-muted file:mr-3 file:rounded-full file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-foreground"
            />
          </Field>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
        </button>
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
