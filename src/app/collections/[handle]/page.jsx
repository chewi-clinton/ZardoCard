import { notFound } from "next/navigation";
import Link from "next/link";
import { CollectionHero } from "@/components/collection-hero";
import { CollectionProductGrid } from "@/components/collection-product-grid";
import { getCollection, getCollectionProducts, toCardProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function CollectionPage({ params }) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) notFound();

  const products = (await getCollectionProducts(handle)).map(toCardProduct);

  return (
    <div className="flex flex-col">
      <CollectionHero
        title={collection.title}
        description={collection.description}
        bannerImage={collection.bannerImage}
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-6">
        <nav className="mb-4 mt-6 text-xs text-muted">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{collection.title}</span>
        </nav>

        <CollectionProductGrid products={products} />
      </div>
    </div>
  );
}
