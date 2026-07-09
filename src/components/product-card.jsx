import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }) {
  const { title, image, price, compareAtPrice, fromPrice, badge } = product;
  const onSale = compareAtPrice && Number(compareAtPrice) > Number(price);
  const save = onSale ? (Number(compareAtPrice) - Number(price)).toFixed(2) : null;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex w-40 shrink-0 flex-col gap-3 sm:w-48"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface border border-border">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {onSale && (
          <span className="absolute top-2 left-2 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
            Save ${save}
          </span>
        )}
        {badge && !onSale && (
          <span className="absolute top-2 left-2 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-foreground line-clamp-2">{title}</h3>
        <span className="flex items-center gap-2 text-sm">
          {onSale ? (
            <>
              <span className="text-red-400">
                {fromPrice ? "From " : ""}${price}
              </span>
              <span className="text-muted line-through">${compareAtPrice}</span>
            </>
          ) : (
            <span className="text-muted">
              {fromPrice ? "From " : ""}${price}
            </span>
          )}
        </span>
      </div>
    </Link>
  );
}
