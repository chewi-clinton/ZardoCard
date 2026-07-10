import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getAllProductHandles, getProduct } from "@/lib/catalog";

export function generateStaticParams() {
  return getAllProductHandles().map((handle) => ({ handle }));
}

export default async function EditProductPage({ params }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  return <ProductForm product={product} />;
}
