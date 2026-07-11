import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MessageCircle, ShieldCheck, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllProductHandles, getProduct } from "@/lib/catalog";
import { applyDisplayPricing } from "@/lib/pricing";

export function generateStaticParams() {
  return getAllProductHandles().map((handle) => ({ handle }));
}

const accordions = [
  {
    icon: ShieldCheck,
    title: "Authenticity & Guarantee",
    body: "All products are 100% authentic, factory-sealed, and in the exact condition described. Every order is inspected, packed, and verified at Zardo HQ.",
  },
  {
    icon: Plane,
    title: "Shipping & Returns",
    body: "All Orders ship within 24 hours with fast, secure and tracked shipping via UPS worldwide expedited. All sales are final. Refunds only for wrong or damaged items (with proof within 7 days). Orders can be cancelled within 24 hours if they haven't shipped.",
  },
];

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const { price, compareAtPrice } = applyDisplayPricing(product.price, product.compareAtPrice);
  const onSale = compareAtPrice && Number(compareAtPrice) > Number(price);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface">
            {product.localImage && (
              <Image
                src={product.localImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{product.title}</h1>

          <div className="flex items-center gap-3">
            {onSale ? (
              <>
                <span className="text-xl font-bold text-red-400">
                  {product.variantCount > 1 ? "From " : ""}${price}
                </span>
                <span className="text-lg text-muted line-through">${compareAtPrice}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-foreground">
                {product.variantCount > 1 ? "From " : ""}${price}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center text-lg text-foreground"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">1</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center text-lg text-foreground"
              >
                +
              </button>
            </div>
            <Button className="flex-1">Add to cart</Button>
          </div>

          <div className="mt-2 divide-y divide-border border-t border-border">
            <details className="group py-4" open>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground">
                <span className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  Description
                </span>
                <ChevronDown
                  size={16}
                  className="shrink-0 text-muted transition-transform group-open:rotate-180"
                />
              </summary>
              <div
                className="prose prose-invert mt-3 max-w-none text-sm text-muted"
                dangerouslySetInnerHTML={{ __html: product.bodyHtml || "" }}
              />
            </details>

            {accordions.map(({ icon: Icon, title, body }) => (
              <details key={title} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground">
                  <span className="flex items-center gap-2">
                    <Icon size={18} />
                    {title}
                  </span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm text-muted">{body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
