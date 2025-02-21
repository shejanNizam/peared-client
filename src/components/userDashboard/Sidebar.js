"use client";

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
import { useSelector } from "react-redux";

export default function Sidebar({
  isCollapsed,
  toggleSidebarCollapsed,
  onLinkClick,
}) {
  const { user } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const firstLinkRef = useRef(null);

  const menuItems = [
    { name: "My Profile", icon: <FaUser />, path: "/profile" },
    {
      name: "My Projects",
      icon: <FaProjectDiagram />,
      path: "/profile/my-projects",
    },
    { name: "Wallet", icon: <FaWallet />, path: "/profile/wallet" },
    { name: "Notifications", icon: <FaBell />, path: "/profile/notifications" },
  ];

  const menuItemsCont = [
    { name: "My Profile", icon: <FaUser />, path: "/profile" },
    {
      name: "Current Projects",
      icon: <FaProjectDiagram />,
      path: "/profile/current-projects",
    },
    { name: "Pending Bids", icon: <FaUser />, path: "/profile/my-bids" },
    { name: "Wallet", icon: <FaWallet />, path: "/profile/wallet" },
    { name: "Notifications", icon: <FaBell />, path: "/profile/notifications" },
    { name: "My Review", icon: <FaBell />, path: "/profile/my-review" },
  ];

  useEffect(() => {
    if (!isCollapsed && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isCollapsed]);

  return (
    <div
      className={`
        min-h-screen transition-all duration-200 ease-in-out bg-gray-800 text-white
        ${isCollapsed ? "w-16" : "w-64"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          {/* (Optional) Logo */}
          <div></div>

          {/* Toggle Button (Desktop collapse) */}
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
          {user?.role === "provider" && (
            <>
              {menuItemsCont.map((item, index) => (
                <Link
                  href={item.path}
                  key={item.name}
                  ref={index === 0 ? firstLinkRef : null}
                  onClick={onLinkClick} // <-- Close the sidebar on link click
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
                  aria-current={pathname === item.path ? "page" : undefined}
                  title={isCollapsed ? item.name : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!isCollapsed && <span className="mx-3">{item.name}</span>}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </>
          )}

          {user?.role === "user" && (
            <>
              {menuItems.map((item, index) => (
                <Link
                  href={item.path}
                  key={item.name}
                  ref={index === 0 ? firstLinkRef : null}
                  onClick={onLinkClick} // <-- Close the sidebar on link click
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
                  aria-current={pathname === item.path ? "page" : undefined}
                  title={isCollapsed ? item.name : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!isCollapsed && <span className="mx-3">{item.name}</span>}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
