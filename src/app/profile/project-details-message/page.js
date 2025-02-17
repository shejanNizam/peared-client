"use client";

import Message from "@/components/project-details-message/Message";
import { useConfirmProjectQuery } from "@/redux/features/projects/projectApi";
import { format } from "date-fns";

export default function ProjectDetails(props) {
  const { projectId } = props.searchParams;
  const { data } = useConfirmProjectQuery(projectId);

  // Safely check and format the startTime
  let formattedStartDate = "N/A";
  const startTimeValue = data?.data?.startTime;
  if (startTimeValue) {
    const startDate = new Date(startTimeValue);
    if (!isNaN(startDate.getTime())) {
      formattedStartDate = format(startDate, "dd MMM yyyy");
    } else {
      console.error("Invalid date:", startTimeValue);
    }
  }

  console.log("Project Complete:", data?.data?.isComplete);
  console.log("Formatted Start Date:", formattedStartDate);

  const handleCompleteProject = () => {
    console.log("click Confirm yes button");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative ">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Project Details
      </h1>

      {/* Main Grid Layout */}
      <button className="absolute top-0 right-0 bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition">
        Report
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Messaging Section Component */}
        <Message />

        {/* Right Section: Project Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl text-primary font-bold mb-4">
            Project Details
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Price:</span> ${data?.data?.price}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Service Time:</span>{" "}
            {data?.data?.serviceTime} Days
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Starting Date:</span>{" "}
            {formattedStartDate}
          </p>

          {/* Work Completion Section */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 relative">
            {data?.data?.isComplete !== "complete" && (
              <div className="w-full h-full rounded-lg absolute bg-gray-500/50 top-0 left-0"></div>
            )}

            <div>
              <h3 className="font-semibold text-center mb-2">
                Did you get services Done?
              </h3>
              <p className="text-sm text-center mb-2">
                after complete this project you can access these button
              </p>
              {/* Buttons */}
              <div className="mt-6 flex justify-center items-center gap-6">
                <button className="border border-red-500 text-red-700 px-5 py-2 rounded-xl font-medium shadow-md hover:bg-red-200 transition">
                  No
                </button>
                <button
                  disabled
                  onClick={handleCompleteProject}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:bg-green-700 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
