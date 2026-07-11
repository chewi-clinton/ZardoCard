import { apiFetch } from "@/lib/api";

function normalizeProduct(p) {
  return {
    handle: p.handle,
    title: p.title,
    description: p.description,
    vendor: p.vendor,
    price: Number(p.price),
    compareAtPrice: p.compare_at_price != null ? Number(p.compare_at_price) : null,
    displayPrice: Number(p.display_price),
    displayCompareAtPrice:
      p.display_compare_at_price != null ? Number(p.display_compare_at_price) : null,
    variantCount: p.variant_count,
    image: p.image,
    categories: p.categories,
  };
}

function normalizeCategory(c) {
  return {
    handle: c.handle,
    title: c.title,
    description: c.description,
    bannerImage: c.banner_image,
    productCount: c.product_count,
  };
}

async function fetchOrNull(path, normalize) {
  try {
    const data = await apiFetch(path);
    return normalize(data);
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

export function getProduct(handle) {
  return fetchOrNull(`/api/products/${encodeURIComponent(handle)}/`, normalizeProduct);
}

export function getCollection(handle) {
  return fetchOrNull(`/api/categories/${encodeURIComponent(handle)}/`, normalizeCategory);
}

export async function getCollectionProducts(handle, { pageSize = 100 } = {}) {
  const data = await apiFetch(
    `/api/products/?category=${encodeURIComponent(handle)}&page_size=${pageSize}`
  );
  return data.results.map(normalizeProduct);
}

// Turns a normalized product (from getCollectionProducts, searchProducts,
// etc.) into the shape ProductCard expects — storefront-facing, so it
// uses the discounted display price, not the true stored price.
export function toCardProduct(p) {
  return {
    handle: p.handle,
    title: p.title,
    image: p.image,
    price: p.displayPrice.toFixed(2),
    compareAtPrice: p.displayCompareAtPrice != null ? p.displayCompareAtPrice.toFixed(2) : null,
    fromPrice: p.variantCount > 1,
  };
}

export async function searchProducts(query, { pageSize = 24 } = {}) {
  if (!query?.trim()) return [];
  const data = await apiFetch(
    `/api/products/?search=${encodeURIComponent(query)}&page_size=${pageSize}`
  );
  return data.results.map(normalizeProduct);
}

// Admin-facing: true stored values, not display pricing.
export async function getAllProductsSummary({ pageSize = 500 } = {}) {
  const data = await apiFetch(`/api/products/?page_size=${pageSize}`);
  return data.results.map(normalizeProduct);
}

export async function getAllCollectionsSummary({ pageSize = 200 } = {}) {
  const data = await apiFetch(`/api/categories/?page_size=${pageSize}`);
  return data.results.map(normalizeCategory);
}
