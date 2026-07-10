import { ProductsTable } from "@/components/admin/products-table";
import { getAllProductsSummary } from "@/lib/catalog";

export default function AdminProductsPage() {
  const products = getAllProductsSummary();
  return <ProductsTable initialProducts={products} />;
}
