"use client";

import { useMyProjectsQuery } from "@/redux/features/projects/projectApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyProjects() {
  const router = useRouter();

  const { data } = useMyProjectsQuery();

  const handleOpenProject = (project) => {
    router.push(`/profile/my-projects/bid-lists?projectid=${project._id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.data?.map((project) => (
        <div
          key={project._id}
          className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
            <Image
              src={`https://magy-abu-sayed.sarv.live/${project?.image}`}
              // src={image}
              alt={project.projectName}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">
              {project.projectName}
            </h3>
            <p className="text-gray-500 mb-1">
              <span className="font-medium">Post Code:</span> {project.postCode}
            </p>
            <p className="text-gray-500 mb-4">
              <span className="font-medium">Time:</span> {project.time}
            </p>
            <p className="text-gray-700 mb-6 flex-grow">
              {project.workDetails}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => handleOpenProject(project)}
                className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
