"use client";

import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();

  const handlePayment = () => {
    router.push(`/profile/project-details-message`);
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-primary mb-4">Payment</h1>
      <p className="text-gray-600 mb-6 text-center">
        Pay Now to confirm your project. <br /> Don’t worry it will be safe in
        admin hands until the project is done.
      </p>
      <div className="bg-green-50 rounded-lg shadow-md p-6 w-full max-w-sm">
        {/* Project Info */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Project</p>
            <p>Pip Replacing</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">Starting Date</p>
            <p>25 Nov 2025</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">Service Time</p>
            <p>03:00h</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">Price</p>
            <p>$ 123</p>
          </div>
        </div>
        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          formTarget=""
          className="bg-primary text-white w-full py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
