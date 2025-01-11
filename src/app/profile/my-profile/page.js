// components/MyProfile.jsx

"use client"; // Ensures client-side rendering for hooks

import { useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa"; // Importing the FaTimes icon
import image from "../../../assets/home/feedback/image1.png";

export default function MyProfile() {
  // Initialize user data state
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    streetAddress: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
  });

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage closing animation
  const [isClosing, setIsClosing] = useState(false);

  // State to manage form inputs within the modal
  const [formData, setFormData] = useState({ ...userData });

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission in the modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Update user data with form data
    setUserData({ ...formData });
    // Initiate closing animation
    setIsClosing(true);
    // Close the modal after animation
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300); // Duration should match the Tailwind transition duration
  };

  // Handle opening the modal and initializing form data
  const openModal = () => {
    setFormData({ ...userData }); // Reset form data to current user data
    setIsModalOpen(true);
  };

  // Handle closing the modal without saving
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300); // Duration should match the Tailwind transition duration
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4 ">
      <h3 className="text-2xl font-semibold">My Profile</h3>

      {/* Bordered Container */}
      <div className="flex justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl h-auto relative p-6">
        {/* Edit Button Positioned Absolutely */}
        <button
          onClick={openModal}
          className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Edit
        </button>

        {/* Profile Image */}
        <Image
          src={image}
          alt="Profile Image"
          className="w-64 h-64 object-cover rounded"
        />

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-600 mb-4">{userData.email}</p>

          {/* Profile Details */}
          <form className="w-full">
            <div className="flex flex-col gap-6">
              {/* Full-Width Field: Street Address */}
              <div className="w-full">
                <label
                  htmlFor="streetAddress"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={userData.streetAddress}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Two Half-Width Fields: City and Postal Code */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* City Field */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={userData.city}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Postal Code Field */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="postalCode"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={userData.postalCode}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Remove the Save Changes button from the main form */}
              {/* It will be handled via the modal */}
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Button */}
      <button className="mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-secondary-dark transition">
        Change Password
      </button>

      {/* Modal Implementation */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeModal} // Close modal when clicking on the overlay
        >
          {/* Modal Content */}
          <div
            className={`bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative transform transition-transform duration-300 ${
              isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button with React Icon */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close Modal"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Street Address Field */}
              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* City Field */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-medium mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Postal Code Field */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Save Changes Button */}
              <button
                type="submit"
                className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-secondary-dark transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
