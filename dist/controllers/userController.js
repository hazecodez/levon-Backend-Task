"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = require("../models/userModel");
const encryption_1 = require("../utils/encryption");
const jwt_1 = require("../utils/jwt");
const errorClasses_1 = require("../utils/errorClasses");
// User registration
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const userExists = yield userModel_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password using the utility function
        const hashedPassword = yield (0, encryption_1.hashPassword)(password);
        // Create a new user with the hashed password
        const newUser = yield userModel_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = (0, jwt_1.generateToken)(newUser === null || newUser === void 0 ? void 0 : newUser._id);
        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    }
    catch (error) {
        //res.status(500).json({ message: "Error registering user" });
        return next(new errorClasses_1.DatabaseError("Error registering user"));
    }
});
exports.registerUser = registerUser;
// User login
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found !!" });
        }
        // Compare the plain password with the hashed password
        const isPasswordValid = yield (0, encryption_1.comparePasswords)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect Password !!" });
        }
        const token = (0, jwt_1.generateToken)(user._id);
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        // res.status(500).json({ message: "Error logging in" });
        return next(new errorClasses_1.DatabaseError("Error occured when user logging in"));
    }
});
exports.loginUser = loginUser;
//User Profile
const userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Retrieve user ID from req.user
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        // Ensure userId is present
        if (!userId) {
            return next(new errorClasses_1.ValidationError("User ID is required"));
        }
        // Fetch the user data from the database
        const userData = yield userModel_1.User.findById(userId);
        // If no user data is found, return a database error
        if (!userData) {
            return next(new errorClasses_1.DatabaseError("User not found"));
        }
        // Return the user data
        res.status(200).json(userData);
    }
    catch (error) {
        // Handle unexpected errors
        next(new errorClasses_1.DatabaseError("Error occured when fetching user profile"));
    }
});
exports.userProfile = userProfile;
