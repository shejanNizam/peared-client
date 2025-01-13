"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const bidList = [
  {
    providerId: "#2345E",
    rating: 5,
    price: "$300",
    reviews: 12,
    serviceTime: "30 Mins",
    startDate: "27 Feb 2025",
    image: "/images/provider1.png", // Use a valid image path or import a static image
  },
  {
    providerId: "#5678F",
    rating: 4,
    price: "$250",
    reviews: 34,
    serviceTime: "45 Mins",
    startDate: "28 Feb 2025",
    image: "/images/provider2.png", // Use a valid image path or import a static image
  },
];

export default function BidList() {
  const router = useRouter();
  //   const { projectId } = router.query;

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">
        {/* Bid List for Project ID: {projectId} */}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bidList.map((bid, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {bid.image && ( // Conditionally render the image if a valid path is provided
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={bid.image} // Use valid image path
                  alt={`Provider ${bid.providerId}`}
                  fill // For dynamic dimensions
                  className="rounded-t-lg object-cover"
                />
              </div>
            )}
            <h4 className="text-lg font-semibold">{bid.providerId}</h4>
            <p>Rating: {bid.rating}/5</p>
            <p>Price: {bid.price}</p>
            <p>Reviews: {bid.reviews}</p>
            <p>Service Time: {bid.serviceTime}</p>
            <p>Starting Date: {bid.startDate}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                See Details
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
