"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { apiFetch, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";

const PAYMENT_METHODS = [
  { value: "zelle", label: "Zelle" },
  { value: "chime", label: "Chime" },
  { value: "apple_pay", label: "Apple Pay" },
  { value: "cash_app", label: "Cash App" },
  { value: "e_transfer", label: "E-Transfer" },
  { value: "venmo", label: "Venmo" },
  { value: "crypto", label: "Crypto" },
];

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZC-${stamp}${rand}`;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("zelle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const orderNumber = generateOrderNumber();
    try {
      const order = await apiFetch("/api/orders/", {
        method: "POST",
        body: {
          order_number: orderNumber,
          customer_name: name,
          customer_email: email,
          payment_method: paymentMethod,
          status: "pending",
          total: subtotal.toFixed(2),
          items: items.map((item) => ({
            product_title: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      });
      setConfirmedOrder(order);
      clearCart();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedOrder) {
    const methodLabel =
      PAYMENT_METHODS.find((m) => m.value === confirmedOrder.payment_method)?.label ??
      confirmedOrder.payment_method;

    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold">Order received!</h1>
        <p className="text-sm text-muted">
          Order <span className="font-bold text-foreground">{confirmedOrder.order_number}</span>{" "}
          for <span className="font-bold text-foreground">${confirmedOrder.total}</span> is
          pending payment via <span className="font-bold text-foreground">{methodLabel}</span>.
          We&apos;ll reach out at {confirmedOrder.customer_email} with instructions to complete
          payment, and confirm your order once it&apos;s received.
        </p>
        <p className="text-xs text-muted">
          Save your order number and email — you can check your order status any time from the
          account icon in the header.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-extrabold">Your cart is empty</h1>
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="text-2xl font-extrabold">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-muted">
              Full name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted">Payment method</span>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm ${
                    paymentMethod === method.value
                      ? "border-accent text-foreground"
                      : "border-border text-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                    className="accent-accent"
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={submitting} className="mt-2">
            {submitting ? "Placing order..." : `Place order — $${subtotal.toFixed(2)}`}
          </Button>
          <p className="text-xs text-muted">
            You won&apos;t be charged automatically. We&apos;ll follow up with instructions to
            complete payment via your selected method.
          </p>
        </form>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-tight text-muted">Order Summary</h2>
        <div className="mt-4 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.handle} className="flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                {item.image && (
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-semibold text-foreground line-clamp-2">
                  {item.title}
                </span>
                <span className="text-xs text-muted">
                  Qty {item.quantity} · ${item.price}
                </span>
              </div>
              <span className="text-sm font-bold text-foreground">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-bold text-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
