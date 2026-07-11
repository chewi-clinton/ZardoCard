"use client";

import { useEffect, useState } from "react";
import { ProductsTable } from "@/components/admin/products-table";
import { getAllProductsSummary } from "@/lib/catalog";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getAllProductsSummary().then(setProducts);
  }, []);

  if (!products) return <p className="text-sm text-muted">Loading products...</p>;

  return <ProductsTable initialProducts={products} />;
}
