import { io } from "socket.io-client";

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io("https://magy-abu-sayed.sarv.live", {
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = () => socket;
