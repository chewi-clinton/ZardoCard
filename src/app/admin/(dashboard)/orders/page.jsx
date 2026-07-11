"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { authFetch } from "@/lib/auth";

const STATUSES = ["pending", "paid", "fulfilled", "cancelled"];

const PAYMENT_LABELS = {
  zelle: "Zelle",
  chime: "Chime",
  apple_pay: "Apple Pay",
  cash_app: "Cash App",
  e_transfer: "E-Transfer",
  venmo: "Venmo",
  crypto: "Crypto",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    authFetch("/api/orders/?page_size=200")
      .then((d) => setOrders(d.results))
      .catch(() => setOrders([]));
  }, []);

  async function handleStatusChange(order, status) {
    setUpdating(order.id);
    try {
      const updated = await authFetch(`/api/orders/${order.id}/`, {
        method: "PATCH",
        body: { status },
      });
      setOrders((prev) => prev.map((o) => (o.id === order.id ? updated : o)));
    } catch (err) {
      alert(err.message || "Failed to update order status.");
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Orders</h1>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-180 text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs font-semibold uppercase text-muted">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{order.order_number}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    <div>{order.customer_name}</div>
                    <div className="text-xs">{order.customer_email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {PAYMENT_LABELS[order.payment_method] ?? order.payment_method}
                  </td>
                  <td className="px-4 py-3 text-muted">${order.total}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      className="rounded-md border border-border bg-surface px-2 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s[0].toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-16">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-muted">
                      <ShoppingBag size={22} />
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {orders === null ? "Loading orders..." : "No orders yet"}
                    </p>
                    {orders !== null && (
                      <p className="max-w-xs text-sm text-muted">
                        Orders will appear here as customers check out.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
