"use client";

import { usePendingBidsQuery } from "@/redux/features/projects/projectApi";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function MyBids() {
  const { data } = usePendingBidsQuery();
  const myProject = data?.data;
  console.log(myProject);

  return (
    <>
      <div className="text-primary text-2xl text-center font-bold my-2">
        My Pending Bids
      </div>
      {myProject?.length === 0 ? (
        <>
          <p className="text-red-500 min-h-screen w-full text-center text-xl font-semibold my-20">
            {" "}
            No bid projects found{" "}
            <Link href={"/projects"}>
              <span className="text-purple-500 underline"> bid project </span>
            </Link>
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {myProject?.map((project) => (
              <div
                key={project._id}
                className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${project?.projectId?.image}`}
                    alt={project.projectId?.projectCategory}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {project?.projectId?.projectCategory}
                  </h3>
                  <p className="text-primary font-bold mb-1">
                    <span className="font-semibold text-black">Post Code:</span>{" "}
                    {project.projectId?.postCode}
                  </p>
                  <p className="text-primary font-bold mb-4">
                    <span className="font-semibold text-black">Price:</span> $
                    {project.price}
                  </p>
                  <p className="text-primary font-bold mb-4">
                    <span className="font-semibold text-black">
                      Starting Date:
                    </span>{" "}
                    {format(new Date(project?.startTime), "dd MMM yyyy")}
                  </p>
                  <p className="text-primary font-bold mb-4">
                    <span className="font-semibold text-black">
                      Service Time:
                    </span>{" "}
                    {project.serviceTime} Days
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
