"use client";

import { useCurrentProjectsQuery } from "@/redux/features/projects/projectApi";
import { Pagination } from "antd"; // Import Pagination from antd
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CurrentProjects() {
  const router = useRouter();

  // Destructure the pagination data and currentProjects from the response
  const { data, isLoading } = useCurrentProjectsQuery();
  const myProject = data?.data?.currentProjects || [];
  const pagination = data?.data?.pagination || {}; // Extract pagination info

  const handleOpenProject = (project) => {
    router.push(
      `/profile/project-details-message?projectId=${project?.projectId?._id}`
    );
  };

  const handlePageChange = (page) => {
    // This will handle the page change; you'd need to pass the page to your query or API call
    // For example, you might use `useCurrentProjectsQuery({ page })` if it accepts page as a parameter.
    console.log("Page changed to: ", page);
  };

  return (
    <>
      <div className="text-primary text-2xl text-center font-bold my-2">
        Current Projects
      </div>
      <div>
        {myProject?.length === 0 ? (
          <p className="text-red-500 min-h-screen w-full text-center text-xl font-semibold my-20">
            After approval, you can see your current project.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {myProject?.map((project) => (
              <div
                key={project._id}
                className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${project?.projectId?.image}`}
                    alt={project.title}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.projectId.projectCategory}
                  </h3>
                  <p className="text-primary font-bold mb-1">
                    <span className="font-semibold text-black ">Price:</span> $
                    {project.price}
                  </p>
                  <p className="text-primary font-bold mb-4">
                    <span className="font-semibold text-black "> Date:</span>{" "}
                    {format(new Date(project?.startTime), "dd MMM yyyy")}
                  </p>

                  <p className="text-primary font-bold mb-1">
                    <span className="font-semibold text-black ">Street:</span>{" "}
                    {project.projectId.street}
                  </p>
                  <p className="text-primary font-bold mb-1">
                    <span className="font-semibold text-black ">
                      Post Code:
                    </span>{" "}
                    {project.projectId.postCode}
                  </p>

                  <p className="text-primary font-bold mb-4">
                    <span className="font-semibold text-black ">Time:</span>{" "}
                    {project.serviceTime} Days
                  </p>
                  <p className="text-black mb-4">{project.Workdetails}</p>

                  <div className="flex justify-center">
                    <button
                      onClick={() => handleOpenProject(project)}
                      className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalData > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              current={pagination.currentPage}
              pageSize={9} // Number of projects per page (based on totalData)
              total={pagination.totalData}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
            />
          </div>
        )}
      </div>
    </>
  );
}
