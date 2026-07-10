import { ShoppingBag } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Orders</h1>

      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs font-semibold uppercase text-muted">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-4 py-16">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-muted">
                    <ShoppingBag size={22} />
                  </span>
                  <p className="text-sm font-semibold text-foreground">No orders yet</p>
                  <p className="max-w-xs text-sm text-muted">
                    Orders will appear here once the store is connected to a real
                    backend and starts accepting payments.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
