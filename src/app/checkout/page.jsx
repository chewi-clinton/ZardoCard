"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Landmark,
  Smartphone,
  DollarSign,
  ArrowLeftRight,
  CreditCard,
  Bitcoin,
  IdCard,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { apiFetch, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/price";

const PAYMENT_METHODS = [
  { value: "zelle", label: "Zelle", Icon: Zap },
  { value: "chime", label: "Chime", Icon: Landmark },
  { value: "apple_pay", label: "Apple Pay", Icon: Smartphone },
  { value: "cash_app", label: "Cash App", Icon: DollarSign },
  { value: "e_transfer", label: "E-Transfer", Icon: ArrowLeftRight },
  { value: "venmo", label: "Venmo", Icon: CreditCard },
  { value: "pay_id", label: "PayID", Icon: IdCard },
  { value: "crypto", label: "Crypto", Icon: Bitcoin },
];

const SHIP_COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Other",
];

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent";

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZC-${stamp}${rand}`;
}

function Field({ label, children, optional }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted">
        {label}
        {optional && <span className="ml-1 font-normal text-muted/60">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { country } = useCurrency();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const orderNumber = generateOrderNumber();
    try {
      const order = await apiFetch("/api/orders/", {
        method: "POST",
        body: {
          order_number: orderNumber,
          customer_name: `${form.firstName} ${form.lastName}`.trim(),
          customer_email: form.email,
          phone: form.phone,
          address_line1: form.addressLine1,
          address_line2: form.addressLine2,
          city: form.city,
          state: form.state,
          zip_code: form.zipCode,
          country: form.country,
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
          for <span className="font-bold text-foreground">${confirmedOrder.total} USD</span> is
          pending payment via <span className="font-bold text-foreground">{methodLabel}</span>.
          We&apos;ll reach out at {confirmedOrder.customer_email} with instructions to complete
          payment, and confirm your order once it&apos;s received.
        </p>
        <p className="text-xs text-muted">
          Save your order number and email — you can check your order status any time from the
          &quot;Track your order&quot; link in the menu.
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
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div>
        <h1 className="text-2xl font-extrabold">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-tight text-muted">
              Contact Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name">
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field label="Last Name">
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className={fieldClass}
                />
              </Field>
            </div>
            <Field label="Email Address">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label="Phone Number" optional>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-tight text-muted">
              Shipping Address
            </h2>
            <Field label="Address Line 1">
              <input
                required
                value={form.addressLine1}
                onChange={(e) => update("addressLine1", e.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label="Address Line 2" optional>
              <input
                value={form.addressLine2}
                onChange={(e) => update("addressLine2", e.target.value)}
                className={fieldClass}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="City">
                <input
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field label="State">
                <input
                  required
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className={fieldClass}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="ZIP Code">
                <input
                  required
                  value={form.zipCode}
                  onChange={(e) => update("zipCode", e.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field label="Country">
                <select
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className={fieldClass}
                >
                  {SHIP_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-tight text-muted">
              Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 min-[700px]:grid-cols-4">
              {PAYMENT_METHODS.map(({ value, label, Icon }) => {
                const selected = paymentMethod === value;
                return (
                  <label
                    key={value}
                    className={`group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-colors ${
                      selected
                        ? "border-accent bg-accent/10 shadow-[0_0_0_3px_rgba(237,195,61,0.12)]"
                        : "border-border bg-surface hover:border-accent/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value={value}
                      checked={selected}
                      onChange={() => {
                        setPaymentMethod(value);
                        setError(null);
                      }}
                      className="absolute opacity-0"
                    />
                    <Icon
                      size={20}
                      className={selected ? "text-accent" : "text-muted group-hover:text-accent/80"}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        selected ? "text-accent" : "text-muted group-hover:text-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={submitting} className="mt-2">
            {submitting ? "Placing order..." : "Place order"}
          </Button>
          <p className="-mt-4 text-xs text-muted">
            You won&apos;t be charged automatically. We&apos;ll follow up with instructions to
            complete payment via your selected method. The order total is billed in USD;{" "}
            {country.currency !== "USD" && (
              <>the <Price amount={subtotal} /> shown is an estimate at today&apos;s rate.</>
            )}
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
                  Qty {item.quantity} · <Price amount={item.price} />
                </span>
              </div>
              <span className="text-sm font-bold text-foreground">
                <Price amount={Number(item.price) * item.quantity} />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-bold text-foreground">
          <span>Subtotal</span>
          <Price amount={subtotal} />
        </div>
      </div>
    </div>
  );
}
