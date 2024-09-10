import express, { Request, Response, NextFunction } from "express";
import http from "http";
import routes from "../routes/routes"; // Import the routes from the routes file.
import { setupSocket } from "./socket"; // Import the socket setup function
import { AppError } from "../utils/errorClasses";
import globalErrorHandler from "../middleware/errorMiddleware";

export const serverCreation = () => {
  try {
    // Create an instance of the Express application.
    const app = express();

    // Middleware to parse incoming JSON requests.
    app.use(express.json());

    // Use the routes defined in the routes file for handling different API endpoints.
    app.use("/", routes);

    // Handle undefined routes
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    // Global error handling middleware
    app.use(globalErrorHandler); // Catch and handle all errors globally

    // Create an HTTP server with the Express application.
    const server = http.createServer(app);

    // Setup Socket.IO
    setupSocket(server);

    return server; // Return the created server.
  } catch (error) {
    console.log("server creation error:", error);
  }
};
