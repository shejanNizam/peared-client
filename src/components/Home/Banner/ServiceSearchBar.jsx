"use client";

import { AutoComplete, Button, Form, Input } from "antd"; // Import Ant Design components
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md"; // Import React Icon for the down arrow

function ServiceSearchBar() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(""); // Track the service input
  const [isFocused, setIsFocused] = useState(false); // Track if the search bar is focused

  const suggestions = [
    "Residential Cleaning",
    "Commercial Cleaning",
    "Painting",
    "Landscaping",
    "Carpentry",
  ];

  // Handle search logic
  const handleSearch = (values) => {
    console.log(values.serviceSearch);
    if (values) {
      // Save the selected service to localStorage before navigation
      localStorage.setItem("selectedCategory", values.serviceSearch);
    }
    router.push(`/add-project`);

    // Clear the form inputs after search
    setSearchTerm("");
    setIsFocused(false); // Hide suggestions after searching
  };

  // Close suggestions when clicking outside the search bar
  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  return (
    <div className="flex justify-center mt-6 sm:mt-10">
      <div className="flex w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl p-4 h-auto">
        {/* Ant Design Form */}
        <Form
          layout="inline"
          className="flex w-full items-center justify-center flex-wrap gap-4" // Added gap here for small devices
          onFinish={handleSearch}
        >
          <Form.Item
            name="serviceSearch"
            initialValue={searchTerm}
            rules={[{ required: true, message: "Please enter a service!" }]}
            className="w-full sm:w-2/3 lg:w-3/4 xl:w-1/2"
          >
            <AutoComplete
              options={suggestions.map((suggestion) => ({
                value: suggestion,
              }))}
              onSelect={(value) => setSearchTerm(value)}
              onSearch={(value) => setSearchTerm(value)}
              style={{ width: "100%" }} // Full width for AutoComplete
            >
              <Input
                placeholder="What type of services are you looking for?"
                value={searchTerm}
                onFocus={() => setIsFocused(true)} // Show suggestions on focus
                onBlur={handleBlur} // Hide suggestions on blur
                style={{ width: "100%" }} // Full width for the input
                className="border border-primary px-4 py-2 focus:outline-none"
                suffix={<MdArrowDropDown />} // Set down arrow icon inside the search input
              />
            </AutoComplete>
          </Form.Item>

          {/* Search Button */}
          <Form.Item className="w-full sm:w-auto sm:ml-4 mt-4 sm:mt-0">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary transition duration-300 w-full sm:w-auto"
            >
              Search/Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ServiceSearchBar;
