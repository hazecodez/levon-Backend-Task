"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitNotification = exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
const setupSocket = (server) => {
    io = new socket_io_1.Server(server, {
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
            io === null || io === void 0 ? void 0 : io.emit("notification", { message: `New message: ${message}` });
        });
    });
};
exports.setupSocket = setupSocket;
// Utility function to emit events from other parts of the app
const emitNotification = (event, data) => {
    if (io) {
        io.emit(event, data);
    }
    else {
        console.error("Socket.IO is not initialized");
    }
};
exports.emitNotification = emitNotification;
