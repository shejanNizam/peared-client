"use client";

import Image from "next/image";
import main_logo from "../../assets/main_logo.svg";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import CustomButton from "../utils/CustomButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Navigation links data
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/project" },
    { name: "Contact", href: "/contact" },
  ];

  // Function to determine active link
  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="bg-secondary shadow-md fixed w-full p-2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-800"
              onClick={closeMenu}
            >
              <Image width={70} height={70} src={main_logo} alt="main_logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-4">
            {/* Navigation Links */}
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? "text-primary underline"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 ml-6">
              <Link
                href="/join-contractor"
                className=" text-black underline hover:text-primary transition duration-200"
              >
                Join as Contractor
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-primary border border-primary rounded-md text-sm font-medium hover:text-white hover:bg-primary transition duration-200"
              >
                Login
              </Link>
              <Link href="/signup">
                <CustomButton>Signup</CustomButton>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Navigation Links */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}

          {/* Divider */}
          <hr className="my-2 border-gray-200" />

          {/* Action Links */}
          <Link
            href="/join-contractor"
            className="block px-3 py-2 text-black underline "
            onClick={closeMenu}
          >
            Join as Contractor
          </Link>
          <Link
            href="/login"
            className="block px-4 py-2 bg-indigo-600 text-white rounded-md text-base font-medium hover:bg-indigo-700 transition duration-200"
            onClick={closeMenu}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-2 bg-indigo-600 text-white rounded-md text-base font-medium hover:bg-indigo-700 transition duration-200"
            onClick={closeMenu}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
