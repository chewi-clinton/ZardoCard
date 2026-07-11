"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, ShoppingCart } from "lucide-react";
import { NavDrawer } from "@/components/nav-drawer";
import { CountrySelector } from "@/components/country-selector";
import { SearchBar } from "@/components/search-bar";
import { useCart } from "@/lib/cart-context";

const announcements = [
  "FREE GIFTS IN EVERY ORDER",
  "FREE SHIPPING ON ORDERS OVER 250$",
  "ALL ORDERS SHIPPED OUT IN LESS THAN 24H",
];

const SCROLL_THRESHOLD = 460;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="overflow-hidden bg-accent text-accent-foreground">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-xs font-bold tracking-wide">
          {Array.from({ length: 4 }).flatMap((_, rep) =>
            announcements.map((text, i) => (
              <span key={`${rep}-${i}`} className="mx-3 inline-flex items-center gap-3">
                {text}
                <span className="h-1 w-1 rounded-full bg-accent-foreground/60" />
              </span>
            ))
          )}
        </div>
      </div>

      <div
        className={`h-20 transition-colors duration-300 sm:h-24 ${
          scrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <NavDrawer />

          <Link href="/" className="select-none">
            <Image
              src="/images/logo.png"
              alt="ZardoCards"
              width={160}
              height={46}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link
              href="/pages/contact"
              className="hidden text-sm font-medium text-foreground hover:text-accent sm:inline"
            >
              Contact Us
            </Link>
            <Link
              href="/pages/sell-your-collection"
              className="hidden text-sm font-medium text-foreground hover:text-accent sm:inline"
            >
              Sell your collection
            </Link>
            <CountrySelector className="hidden md:flex" />
            <SearchBar />
            <Link
              href="/orders/lookup"
              className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
              aria-label="Track your order"
            >
              <User size={20} />
            </Link>
            <button
              onClick={openCart}
              className="relative flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
