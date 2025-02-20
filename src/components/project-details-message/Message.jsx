"use client";

import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useGetAllMessagesQuery } from "@/redux/features/socket/socketApi";
import { getSocket, initSocket } from "../utils/socket";
import { useSelector } from "react-redux";

export default function Message({ conversationId, userId }) {
  // const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { data, isLoading } = useGetAllMessagesQuery(conversationId);

  useEffect(() => {
    if (data?.data) {
      const filtered = data.data.filter(
        (msg) => msg.conversationId === conversationId
      );
      setMessages(filtered);
    }
  }, [data, conversationId]);

  useEffect(() => {
    const socket = initSocket();

    if (conversationId) {
      socket.emit("joinConversation", { conversationId });
      console.log("Joining conversation:", conversationId);
    }

    socket.on("receiveMessage", (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => {
          const alreadyExists = prev.some((m) => m._id === message._id);
          if (!alreadyExists) {
            return [...prev, message];
          }
          return prev;
        });
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [conversationId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const socket = getSocket();
    const outgoingMsg = {
      conversationId,
      senderId: userId,
      messageText: newMessage.trim(),
    };

    socket.emit("sendMessage", outgoingMsg);

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Image
          src="/default-avatar.png"
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="text-lg font-bold leading-none">WILLIUM SMITH</h2>
          <p className="text-gray-500 text-sm">Provider ID: #2345E</p>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => {
          const isOwnMessage = msg.senderId === userId;
          return (
            <div
              key={msg._id}
              className={`mb-3 flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-3 max-w-xs ${
                  isOwnMessage
                    ? "bg-green-200 text-gray-800"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              >
                {msg.messageText}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t p-3 flex gap-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onPressEnter={handleSend}
          className="flex-1"
        />
        <Button
          type="primary"
          loading={isLoading}
          icon={<SendOutlined />}
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
