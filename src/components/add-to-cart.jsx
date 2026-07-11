"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export function AddToCart({ product }) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        handle: product.handle,
        title: product.title,
        image: product.image,
        price: product.displayPrice.toFixed(2),
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-full border border-border">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="flex h-11 w-11 items-center justify-center text-lg text-foreground"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Increase quantity"
          className="flex h-11 w-11 items-center justify-center text-lg text-foreground"
        >
          +
        </button>
      </div>
      <Button onClick={handleAdd} className="flex-1">
        {added ? (
          <span className="flex items-center justify-center gap-2">
            <Check size={16} />
            Added
          </span>
        ) : (
          "Add to cart"
        )}
      </Button>
    </div>
  );
}
