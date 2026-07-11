import { getAllProductsSummary, getAllCollectionsSummary } from "@/lib/catalog";

const SITE_URL = "https://zardocard.com";

const STATIC_PAGES = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/pages/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/pages/sell-your-collection", changeFrequency: "monthly", priority: 0.5 },
  { path: "/pages/lang", changeFrequency: "monthly", priority: 0.3 },
  { path: "/pages/raw-cards-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/policies/shipping-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/policies/refund-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/policies/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/policies/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap() {
  const [products, collections] = await Promise.all([
    getAllProductsSummary({ pageSize: 1000 }).catch(() => []),
    getAllCollectionsSummary({ pageSize: 500 }).catch(() => []),
  ]);

  return [
    ...STATIC_PAGES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
    })),
    ...collections.map((c) => ({
      url: `${SITE_URL}/collections/${c.handle}`,
      changeFrequency: "daily",
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/products/${p.handle}`,
      changeFrequency: "daily",
      priority: 0.7,
    })),
  ];
}
