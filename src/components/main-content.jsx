"use client";

import { usePathname } from "next/navigation";

export function MainContent({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <main className={`flex-1 ${isAdmin ? "" : "pt-28 sm:pt-32"}`}>{children}</main>
  );
}
