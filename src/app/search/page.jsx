import { ProductCard } from "@/components/product-card";
import { searchProducts, toCardProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams;
  const results = q ? (await searchProducts(q, { pageSize: 48 })).map(toCardProduct) : [];

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold sm:text-3xl">
        {q ? `Search results for "${q}"` : "Search"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {q ? `${results.length} products found` : "Enter a search term above to find products."}
      </p>

      {q && results.length === 0 && (
        <p className="mt-10 text-sm text-muted">No products matched your search.</p>
      )}

      {results.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
