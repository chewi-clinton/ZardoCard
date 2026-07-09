import Image from "next/image";

const cells = [
  {
    href: "/collections/all-booster-boxes",
    image: "/images/promo/ShopNow_BoosterBoxBlackv2.png",
    alt: "Shop Booster Boxes",
  },
  {
    href: "/collections/all-etb",
    image: "/images/promo/ShopNow_EliteTrainerBoxBlackv2.png",
    alt: "Shop Elite Trainer Boxes",
  },
  {
    href: null,
    image: "/images/promo/store-photo-1.jpg",
    alt: "Inside the ZardoCards store",
  },
  {
    href: "/collections/collection-boxes",
    image: "/images/promo/ShopNow_CollectionBoxes.png",
    alt: "Shop Collection Boxes",
  },
  {
    href: null,
    image: "/images/promo/store-photo-2.jpg",
    alt: "Inside the ZardoCards store",
  },
  {
    href: "/collections/raw-cards",
    image: "/images/promo/ShopNow_JapaneseProds.png",
    alt: "Shop Japanese Products",
  },
];

export function PromoGrid() {
  return (
    <section className="w-full overflow-hidden py-10">
      <div className="mb-6 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-4 inline-block bg-gradient-to-r from-accent to-[#1a1a1a] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl"
            >
              Shop with ZardoCards
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6">
        {cells.map((cell, i) => {
          const inner = (
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl bg-surface">
              <Image src={cell.image} alt={cell.alt} fill className="object-cover" />
            </div>
          );
          return cell.href ? (
            <a key={i} href={cell.href} className="group block">
              {inner}
            </a>
          ) : (
            <div key={i}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
