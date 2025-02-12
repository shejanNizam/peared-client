"use client";

import { useRouter } from "next/navigation";

const bidList = [
  {
    providerId: "#2345E",
    price: "$300",
    serviceTime: "30 Mins",
    startDate: "27 Feb 2025",
    rating: 5,
    reviews: 12,
  },
  {
    providerId: "#5678F",
    price: "$250",
    serviceTime: "45 Mins",
    startDate: "28 Feb 2025",
    rating: 4,
    reviews: 34,
  },
  {
    providerId: "#2845E",
    price: "$300",
    serviceTime: "30 Mins",
    startDate: "27 Feb 2025",
    rating: 5,
    reviews: 12,
  },
  {
    providerId: "#5778F",
    price: "$250",
    serviceTime: "45 Mins",
    startDate: "28 Feb 2025",
    rating: 4,
    reviews: 34,
  },
];

export default function BidList() {
  const router = useRouter();
  //   const { projectId } = router.query;

  const handleProviderDetails = () => {
    router.push(`/profile/my-projects/provider-details`);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">
        {/* Bid List for Project ID: {projectId} */}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:px-12">
        {bidList.map((bid, index) => (
          <div
            key={index}
            className="bg-secondary p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h4 className="text-lg font-semibold">
              {" "}
              Provider ID: {bid.providerId}
            </h4>
            <p>Rating: {bid.rating}/5</p>
            <p>Price: {bid.price}</p>
            <p>Reviews: {bid.reviews}</p>
            <p>Service Time: {bid.serviceTime}</p>
            <p>Starting Date: {bid.startDate}</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => handleProviderDetails()}
                className="bg-white text-black border border-primary px-4 py-2 rounded hover:bg-primary"
              >
                See Details
              </button>
              <button className="bg-primary text-white hover:bg-white hover:text-black hover:border hover:border-primary px-4 py-2 rounded">
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
