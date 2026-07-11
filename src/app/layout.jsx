import { Ubuntu, Barlow } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MainContent } from "@/components/main-content";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

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

export const metadata = {
  title: "ZardoCards | The #1 Online Pokémon Store",
  description:
    "Discover the ultimate destination for Pokémon card enthusiasts. ZardoCards offers a wide selection of Pokémon cards, from rare finds to beloved classics.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <CartProvider>
          <SiteHeader />
          <MainContent>{children}</MainContent>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
