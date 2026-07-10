import Link from "next/link";
import { Package, FolderTree, ShoppingBag } from "lucide-react";
import { getAllProductHandles, getAllCollectionHandles } from "@/lib/catalog";

export default function AdminDashboardPage() {
  const productCount = getAllProductHandles().length;
  const collectionCount = getAllCollectionHandles().length;

  const stats = [
    { label: "Products", value: productCount, icon: Package, href: "/admin/products" },
    { label: "Categories", value: collectionCount, icon: FolderTree, href: "/admin/categories" },
    { label: "Orders", value: 0, icon: ShoppingBag, href: "/admin/orders" },
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
            <span className="text-3xl font-extrabold text-foreground">{value}</span>
            <span className="text-sm text-muted">{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-sm font-bold text-foreground">Getting started</h2>
        <p className="mt-2 text-sm text-muted">
          Product and category data shown here is scraped from the live reference
          site. Orders will start appearing once the store is connected to a
          real backend and starts accepting payments.
        </p>
      </div>
    </div>
  );
}
