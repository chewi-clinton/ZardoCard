import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getProduct } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  const { handle } = await params;
  const product = await getProduct(decodeURIComponent(handle));
  if (!product) notFound();

  return <ProductForm product={product} />;
}
