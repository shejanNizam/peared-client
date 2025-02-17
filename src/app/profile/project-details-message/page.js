"use client";

import { useState } from "react";

export default function ProjectDetails() {
  // Example chat data in local state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "provider",
      text: "Hi there! I'll be arriving at your location shortly.",
      time: "10:35 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Sounds good, thanks for the update!",
      time: "10:45 AM",
    },
  ]);

  // Local state for new message input
  const [newMessage, setNewMessage] = useState("");

  // Handle sending a new message
  const handleSend = () => {
    if (!newMessage.trim()) return; // don't send empty messages

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // For this demo, we treat all newly sent messages as coming from the "user"
    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: newMessage.trim(),
      time: formattedTime,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Project Details
      </h1>

      {/* Main Grid Layout */}
      <button className="absolute top-0 right-0 bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition">
        Report
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Report Button */}

        {/* Left Section: Provider Info + Chat */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 flex flex-col">
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
          <div className="mt-4 flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <img
                  src="/profile-placeholder.jpg"
                  alt={msg.sender}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div
                    className={`p-3 rounded-lg text-sm text-gray-800 shadow-sm ${
                      msg.sender === "user" ? "bg-gray-100" : "bg-green-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`text-xs text-gray-400 mt-1 ${
                      msg.sender === "user" ? "text-right" : ""
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* New Message Input */}
          <div className="mt-4 flex items-center gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right Section: Project Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
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

          {/* Work Completion Section */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-center mb-2">
              Is your work done?
            </h3>
            <p className="text-xs text-center text-gray-500 mb-4">
              Click the button below to notify your client. Once approved, you
              will receive your payment.
            </p>

            <div className="mt-6 flex justify-center items-center gap-6 ">
              {}
              <button className="border border-red-500 text-red-700 px-5 py-2 rounded-xl font-medium shadow-md hover:bg-red-200 transition">
                No
              </button>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:bg-green-700 transition">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
