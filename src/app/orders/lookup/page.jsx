"use client";

import { useState } from "react";
import { apiFetch, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";

const STATUS_LABELS = {
  pending: "Pending payment",
  paid: "Paid",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled",
};

export default function OrderLookupPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const data = await apiFetch(
        `/api/orders/lookup/?order_number=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`
      );
      setOrder(data);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong looking up your order."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-16 sm:px-6">
      <h1 className="text-center text-3xl font-extrabold">Track Your Order</h1>
      <p className="mt-2 text-center text-sm text-muted">
        Enter your order number and the email you checked out with.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="order_number" className="text-xs font-semibold text-muted">
            Order number
          </label>
          <input
            id="order_number"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="ZC-XXXXXXXX"
            className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
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

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Looking up..." : "Track Order"}
        </Button>
      </form>

      {order && (
        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">{order.order_number}</span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {item.quantity} × {item.product_title}
                </span>
                <span className="text-foreground">${item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-bold text-foreground">
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
