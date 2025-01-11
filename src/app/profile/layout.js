"use client";

import Sidebar from "@/components/userDashboard/Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function ProfileLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar collapsed state (desktop and mobile)

  // Toggle mobile sidebar
  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle sidebar collapse (desktop and mobile)
  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebarOpen={toggleSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        toggleSidebarCollapsed={toggleSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 bg-gray-100 transition-all duration-200 ${
          isSidebarCollapsed ? "md:ml-0" : "md:ml-0"
        }`}
      >
        {/* Header (Visible on Mobile) */}
        <header className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
          <button onClick={toggleSidebarOpen} aria-label="Toggle Sidebar">
            <FaBars size={24} />
          </button>
          <div className="text-2xl font-bold">Profile</div>
        </header>

        {/* Content */}
        <main className="p-10">{children}</main>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebarOpen}
        ></div>
      )}
    </div>
  );
}
