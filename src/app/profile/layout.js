"use client";

import Sidebar from "@/components/userDashboard/Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function ProfileLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="relative flex ">
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden absolute top-4 right-4 z-40 bg-primary text-white p-1 rounded shadow"
      >
        <FaBars size={16} />
      </button>

      <div className="hidden md:block fixed top-20 left-0 z-20">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={() => {}}
        />
      </div>

      <div
        className={`
          fixed top-0 left-0 h-full z-40 bg-gray-800 text-white transition-transform duration-300 md:hidden
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          isCollapsed={false}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={closeMobileSidebar}
        />
      </div>

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <div
        className={`
          flex-1 bg-gray-100 transition-all duration-200 
          ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}
        `}
      >
        <main className="my-4">{children}</main>
      </div>
    </div>
  );
}
