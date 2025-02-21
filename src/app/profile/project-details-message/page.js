"use client";

import Message from "@/components/project-details-message/Message";
import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import {
  useConfirmProjectQuery,
  useProjectDoneByProviderMutation,
  useProjectNotOkByUserMutation,
  useProjectOkByUserMutation,
} from "@/redux/features/projects/projectApi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProjectDetails(props) {
  const { user } = useSelector((state) => state.auth) || {};
  const router = useRouter();
  const { projectId } = props.searchParams;

  // Fetch project data
  const { data } = useConfirmProjectQuery(projectId);
  const conversationId = data?.data?.conversationId;

  const [projectOk] = useProjectOkByUserMutation();
  const [projectNotOk] = useProjectNotOkByUserMutation();
  const [projectDone] = useProjectDoneByProviderMutation();

  // Format start date
  let formattedStartDate = "N/A";
  const startTimeValue = data?.data?.currentProjects?.startTime;
  if (startTimeValue) {
    const startDate = new Date(startTimeValue);
    if (!isNaN(startDate.getTime())) {
      formattedStartDate = format(startDate, "dd MMM yyyy");
    } else {
      console.error("Invalid date:", startTimeValue);
    }
  }

  // Handle user OK
  const handleProjectOk = async () => {
    await projectOk(data?.data?.currentProjects?._id).unwrap();
    SuccessSwal({
      title: "",
      text: "Project completed successfully!",
    });
    router.push(
      `/feedback?providerId=${data?.data?.currentProjects?.providerId}`
    );
  };

  // Handle user Not OK
  const handleProjectNotOk = async () => {
    const response = await projectNotOk(
      data?.data?.currentProjects?._id
    ).unwrap();
    ErrorSwal({
      title: "",
      text: response?.message || response?.data?.message,
    });
  };

  // Handle provider "Done"
  const handleProjectDone = async () => {
    try {
      await projectDone(data?.data?.currentProjects?._id).unwrap();
      SuccessSwal({
        title: "",
        text: "Project completed successfully!",
      });
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || error?.data?.message,
      });
    }
  };

  return (
    <div className="h-[80vh] w-full flex flex-col bg-gray-100">
      {/* Top Bar */}
      <div className="relative flex items-center justify-center">
        {/* <h1 className="text-2xl font-bold text-green-600">Project Details</h1> */}
        <button className="absolute right-4 bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition">
          Report
        </button>
      </div>

      {/* Main Content (grid layout) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 overflow-hidden">
        {/* Left Section: Messaging */}
        <div className="md:col-span-2 flex flex-col h-full overflow-hidden">
          <Message
            conversationId={conversationId}
            userId={user?._id}
            providerData={data}
          />
        </div>

        {/* Right Section: Project Details */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col h-full overflow-auto">
          <h2 className="text-xl text-primary font-bold mb-4">
            Project Details
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Price:</span> $
            {data?.data?.currentProjects?.price}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Service Time:</span>{" "}
            {data?.data?.currentProjects?.serviceTime} Days
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Starting Date:</span>{" "}
            {formattedStartDate}
          </p>

          {/* Work Completion Section */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 flex-1">
            {user?.role === "user" ? (
              <div className="relative">
                {data?.data?.currentProjects?.isComplete !== "complete" && (
                  <div className="w-full h-full rounded-lg absolute bg-gray-500/50 top-0 left-0"></div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-center mb-2">
                    Did you get services Done?
                  </h3>
                  <p className="text-sm text-center mb-2">
                    {data?.data?.currentProjects?.isComplete !== "complete"
                      ? "After completing this project you can access these buttons."
                      : ""}
                  </p>
                  {/* Buttons */}
                  <div className="mt-6 flex justify-center items-center gap-6">
                    <button
                      onClick={handleProjectNotOk}
                      className="border border-red-500 text-red-700 px-5 py-2 rounded-xl font-medium shadow-md hover:bg-red-200 transition"
                    >
                      No
                    </button>
                    <button
                      onClick={handleProjectOk}
                      className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:bg-green-700 transition"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-center mb-2">
                  Is your work done?
                </h3>
                <p className="text-sm text-center mb-2">
                  {
                    "If you click this button, we'll send your client a work done request. If they approve, you get your payment."
                  }
                </p>
                {/* Buttons */}
                <div className="mt-6 flex justify-center items-center gap-6">
                  <button
                    onClick={handleProjectDone}
                    className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:bg-green-700 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
