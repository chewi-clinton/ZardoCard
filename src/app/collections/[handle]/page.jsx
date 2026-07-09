import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getAllCollectionHandles, getCollection, getCollectionProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return getAllCollectionHandles().map((handle) => ({ handle }));
}

export default async function CollectionPage({ params }) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();

  const products = getCollectionProducts(handle);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{collection.title}</span>
      </nav>

      <h1 className="text-3xl font-extrabold sm:text-4xl">{collection.title}</h1>
      {collection.description && (
        <div
          className="prose prose-invert mt-3 max-w-2xl text-sm text-muted [&_a]:text-accent [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: collection.description }}
        />
      )}

      <div className="mt-8 flex items-center justify-between border-y border-border py-3">
        <p className="text-sm text-muted">{products.length} products</p>
        <button className="flex items-center gap-1 text-sm font-semibold text-foreground">
          Sort by: Featured
          <ChevronDown size={14} />
        </button>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No products found in this collection yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
