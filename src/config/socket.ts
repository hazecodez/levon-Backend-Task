import { Server } from "socket.io";
import http from "http";

let io: Server | null = null;

export const setupSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // frontend url
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
    });

    // Listening for custom events
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      // Broadcast to all connected clients
      io?.emit("notification", { message: `New message: ${message}` });
    });
  });
};

// Utility function to emit events from other parts of the app
export const emitNotification = (event: string, data: any) => {
  if (io) {
    io.emit(event, data);
  } else {
    console.error("Socket.IO is not initialized");
  }
};
