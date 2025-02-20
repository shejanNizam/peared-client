"use client";

// import { getSocket, initSocket } from "@/utils/socket";
import { useEffect, useState } from "react";
import { getSocket, initSocket } from "../utils/socket";

export default function Message({ conversationId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // সোকেট ইনিশিয়ালাইজ
    const socket = initSocket();

    // রুমে জয়েন (conversationId)
    if (conversationId) {
      socket.emit("joinConversation", { conversationId });
      console.log("Joining conversation:", conversationId);
    }

    // সার্ভার থেকে নতুন মেসেজ পেলে
    socket.on("receiveMessage", (message) => {
      // যদি মেসেজের conversationId আমাদের বর্তমান conversationId এর সাথে মিলে যায়
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    // cleanup
    return () => {
      socket.off("receiveMessage");
    };
  }, [conversationId]);

  // মেসেজ পাঠানোর হ্যান্ডলার
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const socket = getSocket();
    const data = {
      conversationId,
      senderId: userId,
      messageText: newMessage.trim(),
    };

    // সার্ভারে পাঠিয়ে দিন
    socket.emit("sendMessage", data);

    // চাইলে লোকাল স্টেটেও অ্যাড করতে পারেন
    // (এতে সাথে সাথে UI আপডেট হবে, সার্ভার থেকেও "receiveMessage" এসে আবার আপডেট হবে)
    setMessages((prev) => [...prev, { ...data, _id: Date.now() }]);

    setNewMessage("");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-4">
        Conversation ID: {conversationId}
      </h2>

      {/* মেসেজ লিস্ট */}
      <div className="flex-1 overflow-y-auto mb-4 border p-2 rounded">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.senderId}:</strong> {msg.messageText}
          </div>
        ))}
      </div>

      {/* মেসেজ ইনপুট */}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
