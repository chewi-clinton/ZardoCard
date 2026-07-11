const DISCOUNT_THRESHOLD = 200;
const DISCOUNT_MULTIPLIER = 0.4;

// Products stored above $200 are shown at 40% of that price on the
// storefront. The original price is exposed as the "compare at" price
// so it renders struck through, same as a normal sale.
export function applyDisplayPricing(price, compareAtPrice) {
  const numPrice = Number(price) || 0;

  if (numPrice > DISCOUNT_THRESHOLD) {
    return {
      price: (numPrice * DISCOUNT_MULTIPLIER).toFixed(2),
      compareAtPrice: numPrice.toFixed(2),
    };
  }

  return {
    price: numPrice.toFixed(2),
    compareAtPrice: compareAtPrice != null ? Number(compareAtPrice).toFixed(2) : null,
  };
}
