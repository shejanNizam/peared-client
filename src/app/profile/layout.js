"use client";

import Sidebar from "@/components/userDashboard/Sidebar";
import { useState } from "react";

export default function ProfileLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebarCollapsed={toggleSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 bg-gray-100 transition-all duration-200 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Content */}
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
