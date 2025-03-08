"use client";

import Sidebar from "@/components/userDashboard/Sidebar";
import Link from "next/link"; // Import Link from Next.js
import { useState } from "react";
import { FaProjectDiagram, FaUser, FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ProfileLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // const toggleMobileSidebar = () => {
  //   setIsMobileSidebarOpen((prev) => !prev);
  // };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle Button */}
      {/* <button
        onClick={toggleMobileSidebar}
        className="md:hidden absolute top-4 right-4 z-40 bg-primary text-white p-1 rounded shadow"
      >
        <FaBars size={16} />
      </button> */}

      {/* Sidebar for Desktop */}
      <div className="hidden md:block fixed top-20 left-0 z-20">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={() => {}}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-gray-800 text-white transition-transform duration-300 md:hidden
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          isCollapsed={false}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={closeMobileSidebar}
        />
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-100 transition-all duration-200 
          ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}
      >
        <main className="my-4">{children}</main>
      </div>

      {/* Bottom Bar for Mobile Devices */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around items-center p-3 transition-all duration-200`}
      >
        {/* Conditionally Render Bottom Bar Items */}
        {user?.role === "provider" ? (
          <>
            <Link href="/profile" className="flex flex-col items-center">
              <FaUser size={24} />
              <span className="text-xs">Profile</span>
            </Link>
            <Link
              href="/profile/current-projects"
              className="flex flex-col items-center"
            >
              <FaProjectDiagram size={24} />
              <span className="text-xs">Projects</span>
            </Link>
            <Link
              href="/profile/my-bids"
              className="flex flex-col items-center"
            >
              <FaUser size={24} />
              <span className="text-xs">Bids</span>
            </Link>
            <Link href="/profile/wallet" className="flex flex-col items-center">
              <FaWallet size={24} />
              <span className="text-xs">Wallet</span>
            </Link>
            {/* No Notification here anymore */}
            <Link
              href="/profile/my-review"
              className="flex flex-col items-center"
            >
              <FaUser size={24} />
              <span className="text-xs">Review</span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile" className="flex flex-col items-center">
              <FaUser size={24} />
              <span className="text-xs">Profile</span>
            </Link>
            <Link
              href="/profile/my-projects"
              className="flex flex-col items-center"
            >
              <FaProjectDiagram size={24} />
              <span className="text-xs">My Projects</span>
            </Link>
            <Link href="/profile/wallet" className="flex flex-col items-center">
              <FaWallet size={24} />
              <span className="text-xs">Wallet</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
