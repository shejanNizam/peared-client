// components/Footer.jsx

"use client";

import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              MyLogo
            </Link>
            <p className="mt-2 text-sm">
              We are a company committed to providing the best services in the
              industry.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row">
            <div className="mr-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Company
              </h3>
              <ul>
                <li className="mb-1">
                  <Link href="/about" className="text-sm hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/services"
                    className="text-sm hover:text-gray-900"
                  >
                    Services
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/contact" className="text-sm hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Resources
              </h3>
              <ul>
                <li className="mb-1">
                  <Link href="/blog" className="text-sm hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/faq" className="text-sm hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/support" className="text-sm hover:text-gray-900">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" />
              <span className="text-sm">
                1234 Street Name, City, State, 56789
              </span>
            </div>
            <div className="flex items-center mb-2">
              <FaEnvelope className="mr-2" />
              <span className="text-sm">info@mycompany.com</span>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              <span className="text-sm">(123) 456-7890</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="https://facebook.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://twitter.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
