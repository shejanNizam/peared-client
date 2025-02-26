"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import {
  useBoostProjectMutation,
  useMyProjectsQuery,
} from "@/redux/features/projects/projectApi";
import { Button } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyProjects() {
  const router = useRouter();

  const { data } = useMyProjectsQuery();

  const [boostProject] = useBoostProjectMutation();

  const handleOpenProject = (project) => {
    router.push(`/profile/my-projects/bid-lists?projectId=${project._id}`);
  };

  const handleGoToMessage = (project) => {
    router.push(`/profile/project-details-message?projectId=${project._id}`);
  };

  const handleBoostProject = async (id) => {
    const response = await boostProject(id).unwrap();
    SuccessSwal({
      title: "",
      text: response?.message,
    });
  };

  return (
    <>
      <div className="text-primary text-2xl text-center font-bold my-2">
        My Projects
      </div>
      <div>
        {data?.data?.length === 0 ? (
          <p className="text-red-500 min-h-screen w-full text-center text-xl font-semibold my-20">
            {" "}
            Please add your{" "}
            <Link href={"/"}>
              <span className="text-purple-500 underline"> project </span>
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {data?.data?.map((project) => (
              <div
                key={project._id}
                className="bg-secondary p-2 md:p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300 relative"
              >
                {/* <div className="w-full h-full rounded-lg absolute bg-gray-500/50 top-0 left-0"></div> */}
                <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <Image
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
                  <p className="text-primary font-bold mb-1">
                    <span className="font-semibold text-black">Price:</span> $
                    {project.priceRange}
                  </p>
                  <p className="text-primary font-bold mb-1">
                    <span className="font-semibold text-black">Post Code:</span>{" "}
                    {project.postCode}
                  </p>
                  <p className="text-primary font-bold mb-1">
                    <span className="font-semibold text-black">Street:</span>{" "}
                    {project.street}
                  </p>
                  <p className="text-primary font-bold mb-4">
                    <span className="font-semibold text-black">Time:</span>{" "}
                    {project.time}
                  </p>
                  <p className="text-primary font-bold mb-4">
                    <span className="font-semibold text-black">
                      Start Date:
                    </span>{" "}
                    {/* {project.createdAt} */}
                    {format(new Date(project?.createdAt), "dd MMM yyyy")}
                  </p>

                  <div className="flex justify-center">
                    <Button
                      type="primary"
                      onClick={
                        project?.isApprove === false &&
                        project?.payment === false
                          ? () => handleBoostProject(project._id)
                          : project?.isApprove
                          ? () => handleGoToMessage(project)
                          : () => handleOpenProject(project)
                      }
                      className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
                    >
                      {project?.isApprove === false &&
                      project?.payment === false
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
        )}
      </div>
    </>
  );
}
