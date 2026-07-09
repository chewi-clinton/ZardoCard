import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import newArrivalsData from "../../data/new-arrivals.json";

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

const newArrivals = newArrivalsData.map((p) => ({
  handle: p.handle,
  title: p.title,
  price: `$${Number(p.price).toFixed(2)}`,
  image: p.image,
}));

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden">
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

      <section className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold sm:text-3xl">⭐ Explore New Arrivals</h2>
          <a
            href="/collections/new-arrivals"
            className="text-sm font-semibold text-accent hover:underline"
          >
            View all
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
