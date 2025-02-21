"use client";

import Sidebar from "@/components/userDashboard/Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function ProfileLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toggle sidebar collapse for desktop
  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Toggle sidebar for mobile screens
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  // Close mobile sidebar after a link is clicked
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="relative flex min-h-screen">
      {/* MOBILE TOGGLE BUTTON - appears in top-right corner */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden absolute top-4 right-4 z-40 bg-primary text-white p-2 rounded shadow"
      >
        <FaBars size={20} />
      </button>

      {/* DESKTOP SIDEBAR (fixed) */}
      <div className="hidden md:block fixed top-20 left-0 z-20">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={() => {}} // Desktop doesn't need to close the sidebar
        />
      </div>

      {/* MOBILE SIDEBAR (SLIDE-IN) */}
      <div
        className={`
          fixed top-0 left-0 h-full z-40 bg-gray-800 text-white transition-transform duration-300 md:hidden
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          isCollapsed={false} // For mobile, ignore collapsed state
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={closeMobileSidebar} // Close the sidebar after clicking a link
        />
      </div>

      {/* MOBILE OVERLAY */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* MAIN CONTENT */}
      <div
        className={`
          flex-1 bg-gray-100 transition-all duration-200 pt-20
          ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}
        `}
      >
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
