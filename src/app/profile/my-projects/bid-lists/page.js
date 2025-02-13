"use client";

import { useMyProjectBitsQuery } from "@/redux/features/projects/projectApi";
import { useRouter } from "next/navigation";
import SingleBidCard from "./SingleBidCard";

export default function BidList(props) {
  const { projectId } = props.searchParams;
  const router = useRouter();

  const { data } = useMyProjectBitsQuery(projectId);
  console.log(data?.data);
  // console.log(data?.data[0]?.isComplete);

  const handleProviderDetails = (id) => {
    router.push(`/profile/my-projects/provider-details?bitProjectId=${id}`);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-12">
        {!data?.data || data?.data?.length === 0 ? (
          <p className="text-center text-red-500 col-span-3 w-full">
            No data found
          </p>
        ) : (
          data?.data?.map((bid, index) => (
            <SingleBidCard
              bid={bid}
              key={index}
              handleProviderDetails={handleProviderDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}
