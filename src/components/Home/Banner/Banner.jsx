"use client";

import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BANNER_BG_IMAGE from "../../../assets/home/banner_bg_img.png";
import BANNER_IMG from "../../../assets/home/banner_img.png";

export default function Banner() {
  const [category, setCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Categories",
    "Web Development",
    "Design",
    "Marketing",
    "SEO",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    alert(`Searching for "${searchQuery}" in "${category}"`);
    setSearchQuery("");
  };
  return (
    <>
      <div
        className="h-auto lg:h-[520px]"
        style={{
          backgroundImage: `url(${BANNER_BG_IMAGE.src})`,
        }}
      >
        <div className="ml-80 pt-20 w-[500px] h-[300px] ">
          <div className="w-[800px] h-[350px] border border-primary">
            <div className="w-full px-4">
              <h1 className="text-4xl font-semibold text-primary mb-4">
                Search for pros in your area
              </h1>
              <p className="text-lg text-gray-500 mb-6">
                Here You Can find instantly Service Provider in Your Area
              </p>
              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row items-center"
              >
                {/* Dropdown */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full sm:w-1/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 sm:mb-0 sm:mr-4"
                  aria-label="Select Category"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {/* Search Input */}
                <div className="relative w-full sm:w-2/3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search professionals..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Search Professionals"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Search"
                  >
                    <FaSearch />
                  </button>
                </div>
                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200 mt-4 sm:mt-0 sm:ml-4"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      {/* second */}
      <div className="h-auto lg:h-[520px] flex justify-center items-center bg-[#EFF3F4] ">
        <div className="w-full lg:w-1/2 px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Find the Best Professionals for Your Project
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            blandit, odio nec pharetra malesuada, sem purus commodo urna, sit
            amet luctus lorem nisi nec velit.
          </p>
          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center"
          >
            {/* Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-1/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 sm:mb-0 sm:mr-4"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search professionals..."
              className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 sm:mb-0 sm:mr-4"
            />
            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Search
            </button>
          </form>
        </div>
        <div className="">
          <Image src={BANNER_IMG} alt="banner" />
        </div>
      </div>
    </>
  );
}
