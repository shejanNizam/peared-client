"use client";

import { Button, Modal, Rate } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProviderDetails() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle back button functionality
  const handleBack = () => {
    router.back();
  };

  // Handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    console.log("Service provider's bid approved!");
    // Perform additional actions like API calls or navigation here
    router.push(`/profile/my-projects/payment`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-center mb-6">Details</h3>
      <div className=" border rounded-lg p-4 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-center items-start">
          {/* Provider Info */}
          <div className="mb-4">
            <p>
              <span className="font-semibold">Provider ID:</span> #2345E
            </p>
            <p className="font-bold">Cleaner House Interior</p>
            <p>
              <span className="font-semibold">Price:</span> $300
            </p>
            <p>
              <span className="font-semibold">Service Time:</span> 30 Mins
            </p>
            <p>
              <span className="font-semibold">Starting Date:</span> 27 Feb 2025
            </p>
          </div>

          {/* Ratings Section */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Reviews:</span>
              <Rate allowHalf defaultValue={4} className="mr-2" />
              <span className="text-yellow-500 font-bold">(4/5)</span>
            </div>
            <ul className="mt-2 text-sm text-gray-600 md:ml-32">
              <li>5 ★★★★★ (50)</li>
              <li>4 ★★★★☆ (20)</li>
              <li>3 ★★★☆☆ (15)</li>
              <li>2 ★★☆☆☆ (11)</li>
              <li>1 ★☆☆☆☆ (05)</li>
            </ul>
          </div>
        </div>

        {/* Proposal Message */}
        <div className="mb-6">
          <textarea
            className="w-full h-60 p-4 border border-gray-300 rounded-md"
            rows="8"
            defaultValue={`Hello Dear,
I came across your project listing and would love the opportunity to assist you. Based on your project description, here's how I can help:
• Experience & Skills: I have over [X years] of experience in and hold
• Approach to Your Project: My approach involves
• Proposed Timeline: I can complete this project within [specific timeline].
• Estimated Price: My bid for this project is [specific amount or range, depending on client's preferences].
If you'd like, I can provide references, previous work samples, or address any specific questions you may have about my approach. I am confident that I can deliver results that meet and exceed your expectations.
Looking forward to collaborating with you!`}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8">
          <Button
            type="default"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="primary"
            className="bg-primary border-none hover:bg-green-600"
            onClick={showModal}
          >
            Approved
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Custom footer to include buttons
      >
        <p className="text-xl font font-semibold">
          Are you sure you want to select this service provider’s bid?
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            danger
            onClick={handleCancel}
            className="hover:bg-red-600 hover:text-white"
          >
            No
          </Button>
          <Button
            type="primary"
            className="bg-primary border-none"
            onClick={handleConfirm}
          >
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  );
}
