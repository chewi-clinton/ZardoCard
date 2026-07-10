import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { getAllCollectionHandles, getCollection } from "@/lib/catalog";

export function generateStaticParams() {
  return getAllCollectionHandles().map((handle) => ({ handle }));
}

export default async function EditCategoryPage({ params }) {
  const { handle } = await params;
  const category = getCollection(handle);
  if (!category) notFound();

  return <CategoryForm category={category} />;
}
