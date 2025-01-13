"use client";

import Image from "next/image";
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
import main_logo from "../../assets/main_logo.svg";

const Footer = () => {
  return (
    <footer className="bg-secondary z-40 text-gray-700 py-8 pl-16 md:pl-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image width={70} height={70} src={main_logo} alt="main_logo" />
            </Link>
            <p className="mt-2 text-sm">
              Peared connects customers with trusted local service providers,{" "}
              <br />
              ensuring fair pricing and secure transactions. Service providers{" "}
              <br />
              easily find projects, and all communication stays within our{" "}
              <br />
              platform for safety and simplicity.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row">
            <div className="mr-6">
              <h3 className="font-semibold text-primary text-xl mb-2">
                Explore
              </h3>
              <ul>
                <li className="mb-1">
                  <Link href="/about" className="text-sm hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/services"
                    className="text-sm hover:text-gray-900"
                  >
                    About Us
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/contact" className="text-sm hover:text-gray-900">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mr-6">
              <h3 className="font-semibold text-primary text-xl mb-2">
                Utility Pages
              </h3>
              <ul>
                <li className="mb-1">
                  <Link
                    href="/privacy-policy"
                    className="text-sm hover:text-gray-900"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    href="/terms-use"
                    className="text-sm hover:text-gray-900"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-primary text-xl mb-2">
                Get In Touch
              </h3>
              <ul>
                <li className="mb-1">
                  <Link href="/faq" className="text-sm hover:text-gray-900">
                    peardup@gmail.com
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/support" className="text-sm hover:text-gray-900">
                    (009)56567890g
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
