"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ImageOff } from "lucide-react";
import { htmlToText } from "@/lib/html";

const inputClass =
  "rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent";

export function CategoryForm({ category }) {
  const router = useRouter();
  const isEditing = Boolean(category);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: category?.title ?? "",
    description: htmlToText(category?.description),
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      router.push("/admin/categories");
    }, 400);
  }

  function handleDelete() {
    if (!confirm("Delete this category?")) return;
    router.push("/admin/categories");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-foreground">
          {isEditing ? "Edit Category" : "Add Category"}
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
              rows={6}
              className={`${inputClass} resize-y`}
            />
          </Field>

          {isEditing && (
            <Field label="Products in this category">
              <p className="text-sm text-foreground">
                {category.productHandles?.length ?? 0} products
              </p>
            </Field>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <Field label="Banner image">
            <div className="flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
              {category?.bannerImage ? (
                <Image
                  src={category.bannerImage}
                  alt=""
                  width={400}
                  height={200}
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
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Category"}
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
