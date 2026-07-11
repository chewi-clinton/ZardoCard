"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "zc_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount — must run in an
    // effect (not a lazy useState initializer) so server and first-client
    // render match; localStorage isn't available during SSR.
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  function addItem(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.handle === product.handle);
      if (existing) {
        return prev.map((i) =>
          i.handle === product.handle ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }

  function removeItem(handle) {
    setItems((prev) => prev.filter((i) => i.handle !== handle));
  }

  function updateQuantity(handle, quantity) {
    if (quantity < 1) return removeItem(handle);
    setItems((prev) => prev.map((i) => (i.handle === handle ? { ...i, quantity } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        drawerOpen,
        openCart: () => setDrawerOpen(true),
        closeCart: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
