import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import { hashPassword, comparePasswords } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { ValidationError, DatabaseError } from "../utils/errorClasses";

// User registration
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using the utility function
    const hashedPassword = await hashPassword(password);

    // Create a new user with the hashed password
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser?._id as string);

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    //res.status(500).json({ message: "Error registering user" });
    return next(new DatabaseError("Error registering user"));
  }
};

// User login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found !!" });
    }

    // Compare the plain password with the hashed password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password !!" });
    }

    const token = generateToken(user._id as string);
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // res.status(500).json({ message: "Error logging in" });
    return next(new DatabaseError("Error occured when user logging in"));
  }
};

//User Profile
export const userProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieve user ID from req.user
    const userId = (req as any).user?._id;

    // Ensure userId is present
    if (!userId) {
      return next(new ValidationError("User ID is required"));
    }

    // Fetch the user data from the database
    const userData = await User.findById(userId);

    // If no user data is found, return a database error
    if (!userData) {
      return next(new DatabaseError("User not found"));
    }

    // Return the user data
    res.status(200).json(userData);
  } catch (error) {
    // Handle unexpected errors
    next(new DatabaseError("Error occured when fetching user profile"));
  }
};
