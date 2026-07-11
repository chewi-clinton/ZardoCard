"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logout } from "@/lib/auth";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
];

function SidebarLinks({ pathname, onNavigate }) {
  return (
    <>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-5">
        {navItems.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border px-3 py-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-white/5 hover:text-foreground"
        >
          <ExternalLink size={18} />
          View Store
        </Link>
        <LogoutButton />
      </div>
    </>
  );
}

function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        logout();
        router.push("/admin/login");
      }}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-white/5 hover:text-foreground"
    >
      <LogOut size={18} />
      Log Out
    </button>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-white/5"
        >
          <Menu size={20} />
        </button>
        <Image src="/images/logo.png" alt="ZardoCards" width={110} height={32} className="h-7 w-auto" />
        <span className="w-9" />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <aside className="relative flex h-full w-64 flex-col bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-5">
              <Image src="/images/logo.png" alt="ZardoCards" width={120} height={34} className="h-8 w-auto" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground"
              >
                <X size={16} />
              </button>
            </div>
            <SidebarLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-border bg-surface sm:flex">
        <div className="flex items-center gap-2 border-b border-border px-5 py-5">
          <Image src="/images/logo.png" alt="ZardoCards" width={120} height={34} className="h-8 w-auto" />
        </div>
        <SidebarLinks pathname={pathname} />
      </aside>
    </>
  );
}
