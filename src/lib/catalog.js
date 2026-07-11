import collections from "../../data/collections.json";
import products from "../../data/products.json";
import { applyDisplayPricing } from "@/lib/pricing";

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
  const { price, compareAtPrice } = applyDisplayPricing(p.price, p.compareAtPrice);
  return {
    handle: p.handle,
    title: p.title,
    image: p.localImage,
    price,
    compareAtPrice,
    fromPrice: p.variantCount > 1,
  };
}

export function getCollectionProducts(handle) {
  const collection = getCollection(handle);
  if (!collection) return [];
  return collection.productHandles.map(toCardProduct).filter(Boolean);
}

export function getAllProductsSummary() {
  return Object.values(products).map((p) => ({
    handle: p.handle,
    title: p.title,
    image: p.localImage,
    price: p.price,
    vendor: p.vendor,
  }));
}

export function getAllCollectionsSummary() {
  return Object.values(collections).map((c) => ({
    handle: c.handle,
    title: c.title,
    image: c.bannerImage,
    productCount: c.productHandles?.length ?? 0,
  }));
}
