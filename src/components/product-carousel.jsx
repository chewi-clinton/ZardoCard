import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";

export function ProductCarousel({ title, viewAllHref, products }) {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
        <a
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          View all
          <ChevronRight size={16} />
        </a>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <div key={product.handle} className="w-40 shrink-0 snap-start sm:w-48">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
