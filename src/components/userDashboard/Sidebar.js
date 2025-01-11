// components/Sidebar.jsx

"use client"; // Ensures the component is rendered on the client side

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBell,
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaWallet,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/profile" },
    { name: "My Profile", icon: <FaUser />, path: "/profile/my-profile" },
    {
      name: "My Projects",
      icon: <FaProjectDiagram />,
      path: "/profile/my-projects",
    },
    { name: "Wallet", icon: <FaWallet />, path: "/profile/wallet" },
    { name: "Notifications", icon: <FaBell />, path: "/profile/notifications" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        MyApp
      </div>
      <nav className="mt-10">
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={`flex items-center px-6 py-3 mt-4 ${
              pathname === item.path
                ? "bg-gray-700 border-l-4 border-primary"
                : "hover:bg-gray-700 transition-colors duration-200"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="mx-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
