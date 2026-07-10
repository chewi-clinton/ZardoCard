import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { ProductCarousel } from "@/components/product-carousel";
import { PromoGrid } from "@/components/promo-grid";
import { ReviewsSection } from "@/components/reviews-section";
import { MysteryPromo } from "@/components/mystery-promo";
import { FaqAccordion } from "@/components/faq-accordion";
import { TrustBadges } from "@/components/trust-badges";
import homepageProducts from "../../data/homepage-products.json";

const categories = [
  { label: "Slabs", href: "/collections/all-slabs", image: "/images/category-slabs.png" },
  { label: "Singles", href: "/collections/raw-cards", image: "/images/category-singles.png" },
  { label: "Packs", href: "/collections/booster-packs", image: "/images/category-packs.png" },
  {
    label: "Sleeved Packs",
    href: "/collections/sleeved-packs",
    image: "/images/category-sleeved-packs.png",
  },
  {
    label: "Blisters",
    href: "/collections/checklane-blisters",
    image: "/images/category-blisters.png",
  },
  { label: "Tins", href: "/collections/tins-chests", image: "/images/category-tins.png" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative -mt-28 flex min-h-[520px] items-center justify-center overflow-hidden sm:-mt-32">
        <Image
          src="/images/hero-bg.jpg"
          alt="Inside the ZardoCards Pokémon card store"
          fill
          priority
          className="object-cover object-center brightness-[0.55]"
        />
        <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-24 text-center">
          <p className="text-sm font-bold tracking-wide">
            ⭐⭐⭐⭐⭐ Rated 4.9 out 5
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold sm:text-5xl">
            The #1 Online Pokémon Store
          </h1>
          <ButtonLink href="/collections/new-arrivals">Shop New Arrivals !</ButtonLink>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {categories.map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="group flex flex-col items-center gap-2"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      <ProductCarousel
        title="Explore our New Arrivals"
        viewAllHref="/collections/new-arrivals"
        products={homepageProducts["new-arrivals"]}
      />

      <PromoGrid />

      <ProductCarousel
        title="Explore all our Singles"
        viewAllHref="/collections/raw-cards"
        products={homepageProducts.singles}
      />

      <ProductCarousel
        title="Explore our Slabs"
        viewAllHref="/collections/all-slabs"
        products={homepageProducts.slabs}
      />

      <ProductCarousel
        title="Explore all our Sealed Products"
        viewAllHref="/collections/sealed-1"
        products={homepageProducts.sealed}
      />

      <ReviewsSection />

      <MysteryPromo />

      <FaqAccordion />

      <TrustBadges />
    </div>
  );
}
