import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <AdminSidebar />
      <div className="ml-60 min-h-screen">
        <div className="mx-auto max-w-6xl px-8 py-10">{children}</div>
      </div>
    </div>
  );
}
