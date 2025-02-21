"use client";

import { useMyProjectsQuery } from "@/redux/features/projects/projectApi";
import { Button } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyProjects() {
  const router = useRouter();

  const { data } = useMyProjectsQuery();
  console.log(data?.data);

  const handleOpenProject = (project) => {
    router.push(`/profile/my-projects/bid-lists?projectId=${project._id}`);
  };

  const handleGoToMessage = (project) => {
    router.push(`/profile/project-details-message?projectId=${project._id}`);
  };

  const handleBoostProject = () => {
    console.log("boost your project");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.data?.length === 0 && (
        <p className="text-red-500 w-full mx-auto"> No data found </p>
      )}
      {data?.data?.map((project) => (
        <div
          key={project._id}
          className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300 relative"
        >
          {/* <div className="w-full h-full rounded-lg absolute bg-gray-500/50 top-0 left-0"></div> */}
          <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
            <Image
              // src={`https://magy-abu-sayed.sarv.live/${project?.image}`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${project?.image}`}
              alt={project.projectName}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">
              {project.projectCategory}
            </h3>
            <p className="text-gray-500 mb-1">
              <span className="font-medium">Price:</span> ${project.priceRange}
            </p>
            <p className="text-gray-500 mb-1">
              <span className="font-medium">Post Code:</span> {project.postCode}
            </p>
            <p className="text-gray-500 mb-1">
              <span className="font-medium">Street:</span> {project.street}
            </p>
            <p className="text-gray-500 mb-4">
              <span className="font-medium">Time:</span> {project.time}
            </p>
            <p className="text-gray-500 mb-4">
              <span className="font-medium">Start Date:</span>{" "}
              {/* {project.createdAt} */}
              {format(new Date(project?.createdAt), "dd MMM yyyy")}
            </p>

            <div className="flex justify-center">
              <Button
                type="primary"
                onClick={
                  project?.isApprove === false && project?.payment === false
                    ? handleBoostProject
                    : project?.isApprove
                    ? () => handleGoToMessage(project)
                    : () => handleOpenProject(project)
                }
                className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
              >
                {project?.isApprove === false && project?.payment === false
                  ? "Boost"
                  : project?.isApprove
                  ? " Message "
                  : " Open "}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
