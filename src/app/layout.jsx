import { Ubuntu, Barlow } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MainContent } from "@/components/main-content";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { CurrencyProvider } from "@/lib/currency-context";
import { TawkChat } from "@/components/tawk-chat";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const SITE_URL = "https://zardocard.com";
const SITE_TITLE = "ZardoCards | The #1 Online Pokémon Store";
const SITE_DESCRIPTION =
  "Discover the ultimate destination for Pokémon card enthusiasts. ZardoCards offers a wide selection of Pokémon cards, from rare finds to beloved classics.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | ZardoCards",
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ZardoCards",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "ZardoCards",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  sameAs: ["https://wa.me/14049849812"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZardoCards",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CurrencyProvider>
          <CartProvider>
            <SiteHeader />
            <MainContent>{children}</MainContent>
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </CurrencyProvider>
        <TawkChat />
      </body>
    </html>
  );
}
