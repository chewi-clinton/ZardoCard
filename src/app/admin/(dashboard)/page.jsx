"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, FolderTree, ShoppingBag } from "lucide-react";
import { authFetch } from "@/lib/auth";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ products: null, categories: null, orders: null });

  useEffect(() => {
    authFetch("/api/products/?page_size=1")
      .then((d) => setCounts((c) => ({ ...c, products: d.count })))
      .catch(() => {});
    authFetch("/api/categories/?page_size=1")
      .then((d) => setCounts((c) => ({ ...c, categories: d.count })))
      .catch(() => {});
    authFetch("/api/orders/?page_size=1")
      .then((d) => setCounts((c) => ({ ...c, orders: d.count })))
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Products", value: counts.products, icon: Package, href: "/admin/products" },
    { label: "Categories", value: counts.categories, icon: FolderTree, href: "/admin/categories" },
    { label: "Orders", value: counts.orders, icon: ShoppingBag, href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of your store</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon size={20} />
            </span>
            <span className="text-3xl font-extrabold text-foreground">{value ?? "—"}</span>
            <span className="text-sm text-muted">{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-sm font-bold text-foreground">Getting started</h2>
        <p className="mt-2 text-sm text-muted">
          Product and category data is live from the real store database. Orders
          appear here as customers check out.
        </p>
      </div>
    </div>
  );
}
