import { notFound } from "next/navigation";
import Link from "next/link";
import { CollectionHero } from "@/components/collection-hero";
import { CollectionProductGrid } from "@/components/collection-product-grid";
import { getCollection, getCollectionProducts, toCardProduct } from "@/lib/catalog";

export const revalidate = 60;

function stripHtml(html) {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return {};

  const description =
    stripHtml(collection.description).slice(0, 160) ||
    `Shop ${collection.title} at ZardoCards — authentic Pokémon cards, packs, and sealed products.`;
  const title = collection.title;

  return {
    title,
    description,
    alternates: { canonical: `/collections/${handle}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/collections/${handle}`,
      images: collection.bannerImage ? [{ url: collection.bannerImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: collection.bannerImage ? [collection.bannerImage] : undefined,
    },
  };
}

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
