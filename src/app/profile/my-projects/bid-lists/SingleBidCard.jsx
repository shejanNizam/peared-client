import { format } from "date-fns";
import { FaStar } from "react-icons/fa";

export default function SingleBidCard({ bid, handleProviderDetails }) {
  // Convert averageRating to number and round it
  const rating = Math.round(parseFloat(bid.averageRating));

  // Format the start date to a readable format
  const formattedStartDate = format(new Date(bid.startTime), "dd MMM yyyy");

  return (
    <>
      <div className="border border-gray-300 rounded-xl p-6 bg-gradient-to-br from-green-50 to-green-100 w-96 shadow-lg">
        <div className="text-gray-900 font-semibold text-lg">
          <p>
            <span className="font-extrabold text-green-700">Provider ID:</span>{" "}
            #{bid.providerId.slice(0, 7)}...
          </p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < rating ? "text-yellow-500" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-gray-700 text-sm">
              ({bid.averageRating}/5)
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Reviews: <span className="font-medium"> {bid.totalRating} </span>
          </p>
        </div>

        <div className="mt-4 text-gray-900">
          <p>
            <span className="font-bold text-green-700">Price:</span>{" "}
            <span className="text-black">${bid.price}</span>
          </p>
          <p>
            <span className="font-bold text-green-700">Service Time:</span>{" "}
            {bid.serviceTime} days
          </p>
          <p>
            <span className="font-bold text-green-700">Starting Date:</span>{" "}
            {formattedStartDate}
          </p>
        </div>

        <div className="mt-6 flex justify-center items-center ">
          {}
          <button
            onClick={() => handleProviderDetails(bid?._id)}
            className="border border-green-500 text-green-700 px-5 py-2 rounded-xl font-medium shadow-md hover:bg-green-200 transition"
          >
            See Details
          </button>
          {/* <button className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:bg-green-700 transition">
            Approved
          </button> */}
        </div>
      </div>
    </>
  );
}
