"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";

const navItems = [
  { label: "✨ New Arrivals", href: "/collections/new-arrivals" },
  { label: "⬇️ Shop Pokemon", href: "/collections/new-arrivals" },
  { label: "Sealed Products", href: "/collections/sealed-1" },
  { label: "Slabs", href: "/collections/all-slabs" },
  { label: "Raw Cards", href: "/collections/raw-cards" },
  { label: "Accessories & More", href: "/collections/accessories-more" },
  { label: "⚔️ One Piece", href: "/collections/one-piece" },
  { label: "🧡 Zardo Products", href: "/collections/zardo-products" },
];

export function NavDrawer() {
  const [open, setOpen] = useState(false);

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
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative flex h-full w-[85%] max-w-sm flex-col bg-[#0a0a0a] px-6 py-6">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
            >
              <X size={18} />
            </button>

            <nav className="mt-8 flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-bold text-foreground hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
              <Link
                href="/pages/contact"
                onClick={() => setOpen(false)}
                className="text-sm text-muted hover:text-accent"
              >
                Contact Us
              </Link>
              <Link
                href="/pages/sell-your-collection"
                onClick={() => setOpen(false)}
                className="text-sm text-muted hover:text-accent"
              >
                Sell your collection
              </Link>
            </div>

            <div className="mt-auto flex gap-3 pt-6">
              <a
                href="https://www.facebook.com/zardo_cards/"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground hover:bg-white/10"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/zardo_cards/"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground hover:bg-white/10"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
