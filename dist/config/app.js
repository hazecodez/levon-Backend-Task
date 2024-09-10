"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverCreation = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("../routes/routes")); // Import the routes from the routes file.
const socket_1 = require("./socket"); // Import the socket setup function
const errorClasses_1 = require("../utils/errorClasses");
const errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
const serverCreation = () => {
    try {
        // Create an instance of the Express application.
        const app = (0, express_1.default)();
        // Middleware to parse incoming JSON requests.
        app.use(express_1.default.json());
        // Use the routes defined in the routes file for handling different API endpoints.
        app.use("/", routes_1.default);
        // Handle undefined routes
        app.all("*", (req, res, next) => {
            next(new errorClasses_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
        });
        // Global error handling middleware
        app.use(errorMiddleware_1.default); // Catch and handle all errors globally
        // Create an HTTP server with the Express application.
        const server = http_1.default.createServer(app);
        // Setup Socket.IO
        (0, socket_1.setupSocket)(server);
        return server; // Return the created server.
    }
    catch (error) {
        console.log("server creation error:", error);
    }
};
exports.serverCreation = serverCreation;
