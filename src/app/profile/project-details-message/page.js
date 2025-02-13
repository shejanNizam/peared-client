"use client";

export default function ProjectDetails() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Project Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Report Button */}
        <button className="absolute top-0 right-0 bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition">
          Report
        </button>

        {/* Left Section */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
          {/* Provider Info */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-300">
            <div className="flex items-center gap-4">
              <img
                src="/profile-placeholder.jpg"
                alt="Provider"
                className="w-14 h-14 rounded-full shadow-md"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  WILLIUM SMITH
                </h3>
                <p className="text-sm text-gray-500">Provider ID: #2345E</p>
                <p className="text-xs text-gray-400">3 hours ago</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 font-bold">4/5</span>
                <span className="text-gray-500">(120 Reviews)</span>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="mt-4 space-y-4">
            {/* Provider Message */}
            <div className="flex gap-3">
              <img
                src="/profile-placeholder.jpg"
                alt="Provider"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="bg-green-100 p-3 rounded-lg text-sm text-gray-800 shadow-sm">
                  Lorem ipsum dolor sit amet consectetur. Enim non sit varius in
                  volutpat amet nisi. Faucibus lacus elit faucibus tempus
                  scelerisque. Sagittis.
                </div>
                <p className="text-xs text-gray-400 mt-1">10:35 AM</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-3 flex-row-reverse">
              <img
                src="/profile-placeholder.jpg"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 shadow-sm">
                  Lorem ipsum dolor sit amet consectetur. Enim non sit varius in
                  volutpat amet nisi. Faucibus lacus elit faucibus tempus
                  scelerisque.
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  10:45 AM
                </p>
              </div>
            </div>

            {/* Additional Chat Messages */}
            {/* Repeat provider/user chat bubbles as needed */}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Project Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Project Details
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Price:</span> $300
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Service Time:</span> 30 Mins
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Starting Date:</span> 27 Feb 2025
            </p>
            <p className="text-gray-600 mt-4">
              <span className="font-semibold">Install, Repair or Replace:</span>{" "}
              Plumber
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Category:</span> Plumber
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Street:</span> Street name here
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">City:</span> City name here
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Post Code:</span> E2W23
            </p>
          </div>
          {/* Work Completion Section */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-center mb-2">
              Is your work done?
            </h3>
            <p className="text-xs text-center text-gray-500 mb-4">
              Click the button below to notify your client. Once approved, you
              will receive your payment.
            </p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 w-full shadow-sm">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
