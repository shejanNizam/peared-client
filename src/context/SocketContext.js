"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    console.log(token);
    const newSocket = io(URL, {
      transports: ["websocket"],
      auth: token,
      query: { token },
      extraHeaders: {
        token,
      },
      // query: { token: token },
      // token: token,
      // extraHeaders: {
      // },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
