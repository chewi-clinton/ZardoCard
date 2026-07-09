import collections from "../../data/collections.json";
import products from "../../data/products.json";

export function getCollection(handle) {
  return collections[handle] ?? null;
}

export function getAllCollectionHandles() {
  return Object.keys(collections);
}

export function getProduct(handle) {
  return products[handle] ?? null;
}

export function getAllProductHandles() {
  return Object.keys(products);
}

export function toCardProduct(handle) {
  const p = products[handle];
  if (!p) return null;
  return {
    handle: p.handle,
    title: p.title,
    image: p.localImage,
    price: p.price != null ? p.price.toFixed(2) : "0.00",
    compareAtPrice: p.compareAtPrice != null ? p.compareAtPrice.toFixed(2) : null,
    fromPrice: p.variantCount > 1,
  };
}

export function getCollectionProducts(handle) {
  const collection = getCollection(handle);
  if (!collection) return [];
  return collection.productHandles.map(toCardProduct).filter(Boolean);
}
