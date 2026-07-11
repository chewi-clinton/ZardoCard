"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { FacebookIcon, TikTokIcon, WhatsAppIcon } from "@/components/social-icons";
import navItems from "../../data/nav.json";

function NavNode({ item, onNavigate }) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block text-lg font-bold text-foreground hover:text-accent"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-foreground">
        {item.label}
        <ChevronDown size={16} className="text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 flex flex-col gap-3 border-l border-border pl-4">
        {item.children.map((child) => (
          <NavNode key={child.label} item={child} onNavigate={onNavigate} />
        ))}
      </div>
    </details>
  );
}

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-[#0a0a0a] px-6 py-6">
            <button
              onClick={close}
              aria-label="Close menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground"
            >
              <X size={18} />
            </button>

            <nav className="mt-8 flex flex-col gap-5">
              {navItems.map((item) => (
                <NavNode key={item.label} item={item} onNavigate={close} />
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
              <Link
                href="/pages/contact"
                onClick={close}
                className="text-sm text-muted hover:text-accent"
              >
                Contact Us
              </Link>
              <Link
                href="/pages/sell-your-collection"
                onClick={close}
                className="text-sm text-muted hover:text-accent"
              >
                Sell your collection
              </Link>
              <Link
                href="/orders/lookup"
                onClick={close}
                className="text-sm text-muted hover:text-accent"
              >
                Track your order
              </Link>
            </div>

            <div className="mt-auto flex gap-3 pt-6">
              <a
                href="https://www.facebook.com/share/1BQgKXqqS6/?mibextid=wwXIfr"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground hover:bg-white/10"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.tiktok.com/@zardocards5"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground hover:bg-white/10"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://wa.me/14049849812"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground hover:bg-white/10"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
