import Image from "next/image";

export function MysteryPromo() {
  return (
    <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6">
      <div className="flex flex-col gap-4">
        <a href="/collections/mystery-bags" className="group block">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl bg-surface">
            <Image
              src="/images/promo/MysteryBags_v2.png"
              alt="Shop Mystery Bags"
              fill
              className="object-cover"
            />
          </div>
        </a>
        <a href="/collections/mystery-box" className="group block">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl bg-surface">
            <Image
              src="/images/promo/ZardoUPC_v2.png"
              alt="Shop Zardo UPC"
              fill
              className="object-cover"
            />
          </div>
        </a>
      </div>
      <div className="relative min-h-[260px] w-full overflow-hidden rounded-xl bg-surface sm:min-h-0">
        <Image
          src="/images/promo/mystery-video-poster.jpg"
          alt="Zardo mystery unboxing"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
