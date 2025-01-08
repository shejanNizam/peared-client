"use client";

import { useState } from "react";

function ServiceSearchBar() {
  const [searchTerm, setSearchTerm] = useState(""); // Track the service input
  const [postcode, setPostcode] = useState(""); // Track the postcode input
  const [isFocused, setIsFocused] = useState(false); // Track if the search bar is focused
  const [suggestions] = useState([
    "residential cleaning",
    "commercial cleaning",
    "painting",
    "landscaping",
    "carpentry",
  ]);

  // Handle search logic
  const handleSearch = () => {
    alert(`Searching for "${searchTerm}" in postcode "${postcode}"`);

    // Clear the form inputs after search
    setSearchTerm("");
    setPostcode("");
    setIsFocused(false); // Hide suggestions after searching
  };

  // Close suggestions when clicking outside the search bar
  const handleBlur = () => {
    // Small timeout to allow clicks on suggestions before hiding
    setTimeout(() => setIsFocused(false), 200);
  };

  return (
    <div className="flex justify-center mt-6 sm:mt-10">
      <div className="flex flex-wrap sm:flex-nowrap items-center shadow-sm w-full max-w-lg sm:max-w-2xl lg:max-w-3xl p-4 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search Input */}
        <div className="relative w-full flex-grow">
          <input
            type="text"
            placeholder="What type services are you looking for"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)} // Show suggestions on focus
            onBlur={handleBlur} // Hide suggestions on blur
            className="w-full border border-primary  px-4 py-2 focus:outline-none"
          />
          {/* Dropdown Suggestions */}
          {isFocused && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 max-h-40 overflow-y-auto">
              {suggestions
                .filter(
                  (suggestion) =>
                    searchTerm
                      ? suggestion
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      : true // Show all suggestions if searchTerm is empty
                )
                .map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setIsFocused(false); // Close suggestions after selection
                    }}
                    className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Postcode Input */}
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Post Code"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="w-full sm:w-auto border border-primary px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-primary text-white px-6 py-2 hover:bg-white hover:text-primary hover:border hover:border-primary transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceSearchBar;
