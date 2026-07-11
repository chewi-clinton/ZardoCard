import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MessageCircle, ShieldCheck, Plane } from "lucide-react";
import { AddToCart } from "@/components/add-to-cart";
import { getProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

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
  const product = await getProduct(handle);
  if (!product) notFound();

  const onSale =
    product.displayCompareAtPrice && product.displayCompareAtPrice > product.displayPrice;

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
            {product.image && (
              <Image
                src={product.image}
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
                  {product.variantCount > 1 ? "From " : ""}${product.displayPrice.toFixed(2)}
                </span>
                <span className="text-lg text-muted line-through">
                  ${product.displayCompareAtPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-foreground">
                {product.variantCount > 1 ? "From " : ""}${product.displayPrice.toFixed(2)}
              </span>
            )}
          </div>

          <AddToCart product={product} />

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
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
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
