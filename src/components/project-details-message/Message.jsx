"use client";

import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useGetAllMessagesQuery } from "@/redux/features/socket/socketApi";
import { getSocket, initSocket } from "../utils/socket";

export default function Message({ conversationId, userId }) {
  // State for messages, new message text, and pagination info
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // default limit (adjust as needed)
  const [pagination, setPagination] = useState(null);

  // Ref to scroll to the bottom when messages update
  const messagesEndRef = useRef(null);

  // Use the updated query hook with conversationId, page, and limit params
  const { data, isLoading } = useGetAllMessagesQuery({
    conversationId,
    page,
    limit,
  });

  // When API data loads, update messages:
  // - For page 1, replace messages; for later pages, prepend older messages.
  useEffect(() => {
    if (data?.data) {
      const newMessages = data.data.data.filter(
        (msg) => msg.conversationId === conversationId
      );
      if (page === 1) {
        setMessages(newMessages);
      } else {
        setMessages((prev) => [...newMessages, ...prev]);
      }
      setPagination(data.data.pagination);
    }
  }, [data, conversationId, page]);

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Socket initialization and event listener for receiving new messages
  useEffect(() => {
    const socket = initSocket();

    if (conversationId) {
      socket.emit("joinConversation", { conversationId });
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

  // Handle scroll event on the chat container to load older messages when near top
  const handleScroll = (e) => {
    const target = e.currentTarget;
    if (target.scrollTop < 50) {
      if (pagination && page < pagination.totalPage) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  // Format the timestamp to a readable time (HH:MM)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle sending a new message
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
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
      >
        {isLoading && page === 1 && <p>Loading messages...</p>}
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
                className={`rounded-lg p-3 max-w-xs break-words ${
                  isOwnMessage
                    ? "bg-green-200 text-gray-800"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              >
                <p>{msg.messageText}</p>
                <span className="text-xs text-gray-500 block text-right mt-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        {/* <div ref={messagesEndRef} /> */}
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
