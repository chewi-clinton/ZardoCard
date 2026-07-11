const SITE_URL = "https://zardocard.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/checkout", "/orders/lookup"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
