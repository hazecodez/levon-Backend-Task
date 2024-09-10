import { NextFunction, Request, Response } from "express";
import { emitNotification } from "../config/socket"; // Import the emitNotification function
import { DatabaseError } from "../utils/errorClasses";

// to post a message and trigger a notification
export const postMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;

    // Here, we can save the message in the database

    // Emit the notification to all connected clients
    emitNotification("notification", { message: `New message: ${message}` });

    // Return success response
    res
      .status(201)
      .json({ success: true, message: "Message posted successfully" });
  } catch (error) {
    return next(new DatabaseError("Error posting message"));
  }
};
