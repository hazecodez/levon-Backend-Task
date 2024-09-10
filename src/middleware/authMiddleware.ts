import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { User } from "../models/userModel";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check if authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token (skip the 'Bearer' part)
    token = req.headers.authorization.split(" ")[1];
  }

  // If token is not found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Decode the token to get the user id (payload)
    const decoded = verifyToken(token as string);

    // Fetch the user from the database using the id in the token
    // Exclude the password (for security reason)
    req.user = await User.findById((decoded as any).id).select("-password");

    // If the user is found, allow the request to proceed
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
