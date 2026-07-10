"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-8">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Image src="/images/logo.png" alt="ZardoCards" width={140} height={40} className="h-10 w-auto" />
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-foreground">Admin Login</h1>
            <p className="mt-1 text-sm text-muted">Sign in to manage your store</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="admin@zardocards.com"
              className="rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Demo only — authentication isn&apos;t wired up yet.
        </p>
      </div>
    </div>
  );
}
