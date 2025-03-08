"use client";

import Sidebar from "@/components/userDashboard/Sidebar";
import Link from "next/link"; // Import Link from Next.js
import { usePathname } from "next/navigation"; // Import usePathname to track current path
import { useState } from "react";
import { FaProjectDiagram, FaUser, FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ProfileLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const isActive = (href) => {
    // Match exact pathname or the root of the profile path
    if (pathname === href) {
      return true;
    }
    // For the Profile section and its subroutes, check the first part of the pathname
    if (href === "/profile" && pathname.startsWith("/profile")) {
      return true;
    }
    return false;
  };

  // Define bottom bar menu items for "provider" and default roles
  const bottomBarItemsProvider = [
    { name: "Profile", icon: <FaUser size={24} />, path: "/profile" },
    {
      name: "Projects",
      icon: <FaProjectDiagram size={24} />,
      path: "/profile/current-projects",
    },
    { name: "Bids", icon: <FaUser size={24} />, path: "/profile/my-bids" },
    { name: "Wallet", icon: <FaWallet size={24} />, path: "/profile/wallet" },
    { name: "Review", icon: <FaUser size={24} />, path: "/profile/my-review" },
  ];

  const bottomBarItemsDefault = [
    { name: "Profile", icon: <FaUser size={24} />, path: "/profile" },
    {
      name: "My Projects",
      icon: <FaProjectDiagram size={24} />,
      path: "/profile/my-projects",
    },
    { name: "Wallet", icon: <FaWallet size={24} />, path: "/profile/wallet" },
  ];

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
        <main className="mt-4 mb-20">{children}</main>
      </div>

      {/* Bottom Bar for Mobile Devices */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full bg-secondary  flex justify-around items-center p-3 transition-all duration-200`}
      >
        {/* Conditionally Render Bottom Bar Items */}
        {user?.role === "provider"
          ? bottomBarItemsProvider.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex flex-col items-center ${
                  isActive(item.path) ? "text-primary" : "text-text-gray-800"
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </Link>
            ))
          : bottomBarItemsDefault.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex flex-col items-center ${
                  isActive(item.path) ? "text-primary" : "text-text-gray-800"
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
      </div>
    </div>
  );
}
