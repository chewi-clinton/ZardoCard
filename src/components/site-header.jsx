import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart } from "lucide-react";
import { NavDrawer } from "@/components/nav-drawer";

const announcements = [
  "FREE GIFTS IN EVERY ORDER",
  "FREE SHIPPING ON ORDERS OVER 250$",
  "ALL ORDERS SHIPPED OUT IN LESS THAN 24H",
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black">
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

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
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
    </header>
  );
}
