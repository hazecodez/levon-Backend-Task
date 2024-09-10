import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errorClasses";
import logger from "../utils/logger"; // Import the logger to log errors

// Middleware function to handle errors globally
const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  logger.error(`${err.message} - ${req.method} ${req.url}`);

  // Send the error response back to the client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalErrorHandler;