"use client";

import { useEffect, useState } from "react";
import { CategoriesTable } from "@/components/admin/categories-table";
import { getAllCollectionsSummary } from "@/lib/catalog";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getAllCollectionsSummary().then(setCategories);
  }, []);

  if (!categories) return <p className="text-sm text-muted">Loading categories...</p>;

  return <CategoriesTable initialCategories={categories} />;
}
