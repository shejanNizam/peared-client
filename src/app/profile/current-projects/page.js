"use client";

import { useCurrentProjectsQuery } from "@/redux/features/projects/projectApi";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CurrentProjects() {
  const router = useRouter();

  const { data } = useCurrentProjectsQuery();
  const myProject = data?.data;
  console.log(myProject);

  const handleOpenProject = (project) => {
    console.log(project);
    router.push(
      `/profile/project-details-message?projectId=${project?.projectId?._id}`
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {myProject?.map((project) => (
        <div
          key={project._id}
          className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
            <Image
              // src={project.image}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${project?.image}`}
              alt={project.title}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">
              {project.projectId.projectCategory}
            </h3>
            <p className="text-gray-500 mb-1">
              <span className="font-medium">Price:</span> ${project.price}
            </p>
            <p className="text-gray-500 mb-4">
              <span className="font-medium"> Date:</span>{" "}
              {format(new Date(project?.startTime), "dd MMM yyyy")}
              {/* {project.startTime} */}
            </p>

            <p className="text-gray-500 mb-1">
              <span className="font-medium">Street:</span>{" "}
              {project.projectId.street}
            </p>
            <p className="text-gray-500 mb-1">
              <span className="font-medium">Post Code:</span>{" "}
              {project.projectId.postCode}
            </p>

            <p className="text-gray-500 mb-4">
              <span className="font-medium">Time:</span> {project.serviceTime}
            </p>
            <p className="text-gray-500 mb-4">{project.Workdetails}</p>

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
  );
}
