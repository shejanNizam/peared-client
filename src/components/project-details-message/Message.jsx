"use client";

import { useGetAllMessagesQuery } from "@/redux/features/socket/socketApi";
import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSocket, initSocket } from "../utils/socket";

export default function Message({ conversationId, userId, providerData }) {
  const { user } = useSelector((state) => state.auth) || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState(null);

  const { data, isLoading } = useGetAllMessagesQuery({
    conversationId,
    page,
    limit,
  });

  const containerRef = useRef(null);

  useEffect(() => {
    if (data?.data) {
      const previousScrollHeight = containerRef.current
        ? containerRef.current.scrollHeight
        : 0;
      let loadedMessages = data.data.data.filter(
        (msg) => msg.conversationId === conversationId
      );
      loadedMessages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      if (page === 1) {
        setMessages(loadedMessages);
      } else {
        setMessages((prev) => [...loadedMessages, ...prev]);
      }
      setPagination(data.data.pagination);
      if (page > 1 && containerRef.current) {
        setTimeout(() => {
          const newScrollHeight = containerRef.current.scrollHeight;
          containerRef.current.scrollTop =
            newScrollHeight - previousScrollHeight;
        }, 0);
      }
    }
  }, [data, conversationId, page]);

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

  useEffect(() => {
    if (page === 1 && containerRef.current && messages.length > 0) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, page]);

  const handleScroll = (e) => {
    const target = e.currentTarget;
    if (target.scrollTop < 100) {
      if (pagination && page < pagination.totalPage) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto pb-8">
      {user?.role === "provider" ? (
        <div className="flex items-center p-4 sm:p-6 border-b flex-shrink-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${providerData?.data?.userImage}`}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="ml-3">
            <h2 className="text-lg sm:text-xl font-bold leading-none">
              {providerData?.data?.userName}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              User ID:{" "}
              {providerData?.data?.currentProjects?.projectId?.userId.slice(
                0,
                7
              ) + "..."}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center p-4 sm:p-6 border-b flex-shrink-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${providerData?.data?.currentProjects?.providerId?.image}`}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="ml-3">
            <h2 className="text-lg sm:text-xl font-bold leading-none">
              {providerData?.data?.currentProjects?.providerId?.name}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Provider ID:{" "}
              {providerData?.data?.currentProjects?.providerId?._id.slice(
                0,
                7
              ) + "..."}
            </p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50"
      >
        {isLoading && page === 1 && <p>Loading messages...</p>}
        {messages?.map((msg) => {
          const isOwnMessage = msg.senderId === userId;
          return (
            <div
              key={msg._id}
              className={`mb-3 flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-3 max-w-xs sm:max-w-sm break-words ${
                  isOwnMessage
                    ? "bg-green-200 text-gray-800"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              >
                <p className="text-sm sm:text-base">{msg.messageText}</p>
                <span className="text-xs text-gray-500 block text-right mt-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t p-3 sm:p-4 flex gap-2 flex-shrink-0">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onPressEnter={handleSend}
          className="flex-1"
        />
        <Button
          type="primary"
          className="p-3 sm:p-4"
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
