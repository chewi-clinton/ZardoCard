"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, drawerOpen, closeCart } = useCart();

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/70"
      />
      <div className="relative ml-auto flex h-full w-[90%] max-w-md flex-col bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="text-lg font-bold text-foreground">Your Cart</p>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-muted">
              <ShoppingBag size={22} />
            </span>
            <p className="text-sm font-semibold text-foreground">Your cart is empty</p>
            <Link
              href="/"
              onClick={closeCart}
              className="text-sm font-semibold text-accent hover:underline"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="flex flex-col gap-5">
                {items.map((item) => (
                  <div key={item.handle} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                      {item.image && (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-bold text-foreground line-clamp-2">
                          {item.title}
                        </span>
                        <button
                          onClick={() => removeItem(item.handle)}
                          aria-label="Remove"
                          className="shrink-0 text-muted hover:text-red-400"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className="text-sm text-muted">${item.price}</span>
                      <div className="mt-1 flex items-center rounded-full border border-border w-fit">
                        <button
                          onClick={() => updateQuantity(item.handle, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center text-foreground"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.handle, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center text-foreground"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border p-6">
              <div className="mb-4 flex items-center justify-between text-sm font-bold text-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-full bg-accent px-6 py-3.5 text-center text-[15px] font-bold text-accent-foreground hover:bg-accent/90"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
