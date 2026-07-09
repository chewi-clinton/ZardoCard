import { ChevronRight } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";

const policyLinks = [
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Raw & Sealed Policy", href: "/pages/raw-cards-policy" },
  { label: "Refund Policy", href: "/policies/refund-policy" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms of Service", href: "/policies/terms-of-service" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/zardo_cards/", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/zardo_cards/", Icon: InstagramIcon },
];

const paymentMethods = [
  "Amex",
  "Apple Pay",
  "Diners",
  "Discover",
  "Google Pay",
  "Mastercard",
  "PayPal",
  "Shop Pay",
  "Visa",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-4">
          <span
            className="text-xl font-extrabold uppercase tracking-tight text-accent"
            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
          >
            Zardo Cards
          </span>
          <p className="max-w-xs text-lg font-bold text-foreground">
            Sign up for exclusive deals, news and more !
          </p>
          <form className="flex w-full max-w-xs items-center gap-2 rounded-full border border-border px-4 py-2.5">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
            >
              <ChevronRight size={14} />
            </button>
          </form>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-tight text-foreground">
            Policies
          </h4>
          <ul className="mt-3 flex flex-col gap-2">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <a
            href="https://shop.app"
            className="inline-flex items-center gap-2 rounded-full bg-[#5a31f4] px-4 py-2 text-sm font-bold text-white"
          >
            Follow on Shop
          </a>
          <div className="flex gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground hover:bg-white/10"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()}, ZardoCards.</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded border border-border px-2 py-1 text-[10px] font-semibold text-muted"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
