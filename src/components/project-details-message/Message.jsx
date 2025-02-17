"use client";

import { useState } from "react";

export default function Message() {
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
    <>
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
              <h3 className="font-bold text-lg text-gray-800">WILLIUM SMITH</h3>
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
    </>
  );
}
