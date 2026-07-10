import { CategoriesTable } from "@/components/admin/categories-table";
import { getAllCollectionsSummary } from "@/lib/catalog";

export default function AdminCategoriesPage() {
  const categories = getAllCollectionsSummary();
  return <CategoriesTable initialCategories={categories} />;
}
