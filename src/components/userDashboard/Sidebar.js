// components/userDashboard/Sidebar.jsx

"use client"; // Ensures the component is rendered on the client side

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBell,
  FaProjectDiagram,
  FaUser,
  FaWallet,
} from "react-icons/fa";

export default function Sidebar({
  isOpen,
  toggleSidebarOpen,
  isCollapsed,
  toggleSidebarCollapsed,
}) {
  const pathname = usePathname();
  const firstLinkRef = useRef(null);

  const menuItems = [
    { name: "My Profile", icon: <FaUser />, path: "/profile/my-profile" },
    {
      name: "My Projects",
      icon: <FaProjectDiagram />,
      path: "/profile/my-projects",
    },
    { name: "Wallet", icon: <FaWallet />, path: "/profile/wallet" },
    { name: "Notifications", icon: <FaBell />, path: "/profile/notifications" },
  ];

  // Focus on the first link when sidebar opens on mobile
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`
           min-h-screen fixed inset-y-0 left-0 z-50 md:z-20 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto
          transition-transform duration-200 ease-in-out 
          bg-gray-800 text-white 
          ${isCollapsed ? "w-16 md:w-16 " : "w-64 md:w-64"}           
        `}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            {/* Logo */}
            <Link href="/">
              <span
                className={`text-2xl font-bold flex items-center relative group cursor-pointer ${
                  isCollapsed ? "justify-center" : ""
                }`}
                aria-label=""
                onClick={isOpen ? toggleSidebarOpen : undefined} // Close sidebar on mobile logo click
                title={isCollapsed ? "MyApp" : undefined} // Show tooltip when collapsed
              >
                {/* Replace with your logo if needed */}
              </span>
            </Link>

            {/* Toggle Button */}
            <button
              onClick={toggleSidebarCollapsed}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="focus:outline-none"
            >
              {isCollapsed ? (
                <FaArrowRight size={20} />
              ) : (
                <FaArrowLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-10 flex-1">
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={item.name}
                onClick={isOpen ? toggleSidebarOpen : undefined} // Close sidebar on link click (mobile)
                className={`
                    flex items-center px-4 py-3 mt-2 
                    ${
                      pathname === item.path
                        ? "bg-gray-700 text-primary font-semibold border-l-4 border-primary"
                        : "hover:bg-gray-700 transition-colors duration-200"
                    }
                    ${
                      isCollapsed
                        ? "justify-center relative group cursor-pointer"
                        : ""
                    }
                  `}
                ref={index === 0 ? firstLinkRef : null} // Focus on the first link
                aria-current={pathname === item.path ? "page" : undefined}
                title={isCollapsed ? item.name : undefined} // Show tooltip when collapsed
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="mx-3">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
