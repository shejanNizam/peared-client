"use client";

import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSocket, initSocket } from "../utils/socket";

import default_img from "../../assets/user_img_default.png";

export default function Message({ conversationId, userId, providerData }) {
  const { user } = useSelector((state) => state.auth) || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [pagination, setPagination] = useState(null);
  const [loadedPages, setLoadedPages] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    if (loadedPages.has(page)) return;
    const token = localStorage.getItem("user_token");
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/conversation/${conversationId}?page=${page}&limit=${limit}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const previousScrollHeight = containerRef.current?.scrollHeight || 0;
        const loadedMessages = data?.data?.data.filter(
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
        setLoadedPages((prev) => new Set(prev).add(page));
        if (page > 1 && containerRef.current) {
          setTimeout(() => {
            const newScrollHeight = containerRef.current.scrollHeight;
            containerRef.current.scrollTop =
              newScrollHeight - previousScrollHeight;
          }, 50);
        }
      })
      .catch((err) => console.log(err));
  }, [conversationId, page, loadedPages]);

  useEffect(() => {
    const socket = initSocket();
    if (conversationId) {
      socket.emit("joinConversation", { conversationId });
    }

    const handleReceiveMessage = (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === message._id)) return prev;
          return [...prev, message];
        });
        if (containerRef.current) {
          const { scrollTop, clientHeight, scrollHeight } =
            containerRef.current;
          if (scrollHeight - scrollTop - clientHeight < 50) {
            setTimeout(() => {
              containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
              });
            }, 50);
          }
        }
      }
    };
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [conversationId]);

  useEffect(() => {
    if (page === 1 && containerRef.current && messages.length > 0) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, page]);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop } = e.currentTarget;
      if (scrollTop === 0 && pagination && page < pagination.totalPage) {
        setPage((prev) => prev + 1);
      }
    },
    [pagination, page]
  );

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
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);
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
              )}
              ...
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
              {providerData?.data?.currentProjects?.providerId?._id.slice(0, 7)}
              ...
            </p>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        // style={{ scrollBehavior: "smooth" }}
        className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50"
      >
        {messages?.map((msg) => {
          const isOwnMessage = msg.senderId === userId;

          const avatarSrc = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${
            providerData?.data?.userImage || default_img
          }`;

          return (
            <div
              key={msg._id}
              className={`mb-3 flex items-end ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwnMessage && (
                <div className="mr-2">
                  <Image
                    src={avatarSrc}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
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
          icon={<SendOutlined />}
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
