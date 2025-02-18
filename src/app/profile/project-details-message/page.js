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
  const { user } = useSelector((state) => state.auth);

  const { projectId } = props.searchParams;
  console.log(projectId);

  const { data } = useConfirmProjectQuery(projectId);

  const [projectOk] = useProjectOkByUserMutation(projectId);
  const [projectNotOk] = useProjectNotOkByUserMutation(projectId);

  const [projectDone] = useProjectDoneByProviderMutation(projectId);

  const router = useRouter();

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

  const handleProjectOk = async () => {
    const response = await projectOk(projectId).unwrap();
    // console.log(response);
    SuccessSwal({
      title: "",
      text: "Project completed successfully!",
    });

    router.push(`/feedback?providerId=${data?.data?.providerId}`);
  };

  const handleProjectNotOk = async () => {
    // before click yes button do something as we need
    const response = await projectNotOk(projectId).unwrap();
    // console.log(response);

    ErrorSwal({
      title: "",
      text: " Project not complete! ",
    });
  };

  const handleProjectDone = async () => {
    // before click yes button do something as we need
    const response = await projectDone(projectId).unwrap();
    console.log(response);
    SuccessSwal({
      title: "",
      text: "Project completed successfully!",
    });
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
            {/* {data?.data?.isComplete !== "complete" && (
              <div className="w-full h-full rounded-lg absolute bg-gray-500/50 top-0 left-0"></div>
            )} */}
            {user?.role === "user" ? (
              <>
                <div>
                  <div>
                    <h3 className="font-semibold text-center mb-2">
                      Did you get services Done?
                    </h3>
                    <p className="text-sm text-center mb-2">
                      after complete this project you can access these button
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
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold text-center mb-2">
                    Are your work is done?
                  </h3>
                  <p className="text-sm text-center mb-2">
                    If you click this button we send your client work done
                    request if they approve then you get your payment
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
