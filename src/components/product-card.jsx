import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col gap-3"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface border border-border">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold uppercase tracking-tight text-foreground line-clamp-2">
          {product.title}
        </h3>
        <span className="text-sm text-muted">{product.price}</span>
      </div>
    </Link>
  );
}
