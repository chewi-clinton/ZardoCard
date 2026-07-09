import Link from "next/link";
import Image from "next/image";
import { Menu, Search, User, ShoppingCart } from "lucide-react";

const announcements = [
  "SHIPPED SAME DAY BEFORE 2PM CET",
  "FREE GIFT WITH EVERY ORDER",
];

const navLinks = [
  { label: "Slabs", href: "/collections/all-slabs" },
  { label: "Singles", href: "/collections/raw-cards" },
  { label: "Packs", href: "/collections/booster-packs" },
  { label: "Sleeved Packs", href: "/collections/sleeved-packs" },
  { label: "Blisters", href: "/collections/checklane-blisters" },
  { label: "Tins", href: "/collections/tins-chests" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="overflow-hidden bg-accent text-accent-foreground">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-xs font-bold tracking-wide">
          {[...announcements, ...announcements, ...announcements, ...announcements].map(
            (text, i) => (
              <span key={i} className="mx-6 inline-block">
                {text}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

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
          <button
            className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
            aria-label="Account"
          >
            <User size={20} />
          </button>
          <button
            className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-white/5"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-8 px-6 py-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-tight text-foreground hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
