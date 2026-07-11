"use client";

import { ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FacebookIcon, TikTokIcon } from "@/components/social-icons";
import { CountrySelector } from "@/components/country-selector";
import {
  AmexIcon,
  ApplePayIcon,
  BancontactIcon,
  DinersIcon,
  DiscoverIcon,
  GooglePayIcon,
  IdealWeroIcon,
  MastercardIcon,
  PayPalIcon,
  ShopPayIcon,
  VisaIcon,
} from "@/components/payment-icons";

const policyLinks = [
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Raw & Sealed Policy", href: "/pages/raw-cards-policy" },
  { label: "Refund Policy", href: "/policies/refund-policy" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms of Service", href: "/policies/terms-of-service" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1BQgKXqqS6/?mibextid=wwXIfr",
    Icon: FacebookIcon,
  },
  { label: "TikTok", href: "https://www.tiktok.com/@zardocards5", Icon: TikTokIcon },
];

const paymentIcons = [
  AmexIcon,
  ApplePayIcon,
  BancontactIcon,
  DinersIcon,
  DiscoverIcon,
  GooglePayIcon,
  IdealWeroIcon,
  MastercardIcon,
  PayPalIcon,
  ShopPayIcon,
  VisaIcon,
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 pt-14 sm:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Image
            src="/images/logo.png"
            alt="ZardoCards"
            width={160}
            height={46}
            className="h-11 w-auto"
          />
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

        <div className="flex items-start justify-start sm:justify-end">
          <a
            href="https://shop.app"
            className="inline-flex items-center gap-2 rounded-full bg-[#5a31f4] px-4 py-2 text-sm font-bold text-white"
          >
            <Heart size={14} fill="currentColor" />
            Follow on shop
          </a>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col-reverse items-center justify-between gap-4 px-6 py-8 sm:flex-row">
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
        <CountrySelector />
      </div>

      <div className="border-t border-border px-6 py-6">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()}, ZardoCards.</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {paymentIcons.map((Icon, i) => (
              <Icon key={i} className="h-6 w-auto" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
