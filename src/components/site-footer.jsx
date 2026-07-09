import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Slabs", href: "/collections/all-slabs" },
      { label: "Booster Packs", href: "/collections/booster-packs" },
      { label: "Booster Boxes", href: "/collections/all-booster-boxes" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/pages/contact" },
      { label: "Shipping & Returns", href: "/pages/shipping-protection-terms" },
      { label: "Sell Your Collection", href: "/pages/sell-your-collection" },
      { label: "Raw Cards Policy", href: "/pages/raw-cards-policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/pages/landing-page" },
      { label: "Careers", href: "/pages/hiring-zardocards" },
      { label: "VIP Rewards", href: "/pages/vip-rewards-tracker" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <span
            className="text-xl font-extrabold uppercase tracking-tight text-accent"
            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
          >
            Zardo Cards
          </span>
          <p className="mt-3 text-sm text-muted">
            The #1 online destination for Pokémon cards, slabs, and sealed
            product.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-tight text-foreground">
              {col.title}
            </h4>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} ZardoCards. All rights reserved.
      </div>
    </footer>
  );
}
