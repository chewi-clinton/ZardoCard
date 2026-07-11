"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { isLoggedIn } from "@/lib/auth";

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Auth state lives in localStorage, unavailable during SSR, so this
    // gate has to run client-side in an effect rather than during render.
    if (!isLoggedIn()) {
      router.replace("/admin/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-black">
      <AdminSidebar />
      <div className="min-h-screen pt-16 sm:ml-60 sm:pt-0">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">{children}</div>
      </div>
    </div>
  );
}
