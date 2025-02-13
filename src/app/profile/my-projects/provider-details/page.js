"use client";

import { useMyProjectBitDetailsQuery } from "@/redux/features/projects/projectApi";
import { Button, Modal, Rate } from "antd";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ProviderDetails(props) {
  const { bitProjectId } = props.searchParams;
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data } = useMyProjectBitDetailsQuery(bitProjectId);
  const bid = data?.data;

  // Format the start date
  const formattedStartDate = bid?.startDate
    ? format(new Date(bid.startDate), "dd MMM yyyy")
    : "N/A";

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
    // console.log("Service provider's bid approved!");
    router.push(`/profile/my-projects/payment`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Provider Details
      </h3>
      <div className="border rounded-lg p-6 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Provider Info */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">
              Provider ID: #{bid?.providerId.slice(0, 7)}...
            </p>
            <p className="text-xl font-bold text-green-700">
              {bid?.projectType}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Provider Name: </span>{" "}
              {bid?.providerName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Price:</span> ${bid?.price}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Service Time:</span>{" "}
              {bid?.serviceTime} Days
            </p>
            <p className="text-lg">
              <span className="font-semibold">Starting Date:</span>{" "}
              {formattedStartDate}
            </p>
          </div>

          {/* Ratings Section */}
          <div className="mb-6 w-full md:w-1/3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Reviews:</span>
              <Rate
                allowHalf
                value={parseFloat(bid?.averageRating)}
                disabled
                className="text-yellow-500"
              />
              <span className="text-gray-700 font-bold">
                ({bid?.averageRating}/5)
              </span>
            </div>
            <div className="mt-4">
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className="flex items-center gap-2 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < num ? "text-yellow-500" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-gray-800">
                    ({bid?.ratingDistribution[num]})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Details */}
        <div className="mb-6 border p-4 rounded-lg bg-white shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Work Details
          </h4>
          <p className="text-gray-700 text-lg leading-relaxed">
            {bid?.workdetails || "No work details provided."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8">
          <Button
            type="default"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="primary"
            className="bg-green-600 border-none hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md"
            onClick={showModal}
          >
            Approve
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        <p className="text-xl font-semibold text-gray-800">
          Are you sure you want to select this service provider’s bid?
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            danger
            onClick={handleCancel}
            className="hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg"
          >
            No
          </Button>
          <Button
            type="primary"
            className="bg-green-600 border-none text-white px-4 py-2 rounded-lg"
            onClick={handleConfirm}
          >
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  );
}
