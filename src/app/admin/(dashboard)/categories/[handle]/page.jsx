import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { getCollection } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }) {
  const { handle } = await params;
  const category = await getCollection(decodeURIComponent(handle));
  if (!category) notFound();

  return <CategoryForm category={category} />;
}
