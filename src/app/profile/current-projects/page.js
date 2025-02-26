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
    // console.log(project);
    router.push(
      `/profile/project-details-message?projectId=${project?.projectId?._id}`
    );
  };

  return (
    <>
      <div className="text-primary text-2xl text-center font-bold my-2">
        Current Projects
      </div>
      <div>
        {myProject?.length === 0 ? (
          <p className="text-red-500 min-h-screen w-full text-center text-xl font-semibold my-20">
            {" "}
            After approve you can see your current project.
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
                    // src={project.image}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${project?.projectId?.image}`}
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
                    {/* {project.startTime} */}
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
      </div>
    </>
  );
}
