// import { io } from "socket.io-client";

import { io } from "socket.io-client";

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = () => socket;
