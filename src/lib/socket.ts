import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false, // পেজ লোডের পর নির্দিষ্ট সময় কানেক্ট করার জন্য
  transports: ["websocket"],
});
