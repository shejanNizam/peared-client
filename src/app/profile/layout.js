// app/profile/layout.jsx

"use client";
import Sidebar from "@/components/userDashboard/Sidebar";

// Necessary for using client-side hooks like usePathname

export default function ProfileLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
}
