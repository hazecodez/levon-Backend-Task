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
exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const userModel_1 = require("../models/userModel");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // Check if authorization header is present and starts with 'Bearer'
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        // Extract the token (skip the 'Bearer' part)
        token = req.headers.authorization.split(" ")[1];
    }
    // If token is not found, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        // Decode the token to get the user id (payload)
        const decoded = (0, jwt_1.verifyToken)(token);
        // Fetch the user from the database using the id in the token
        // Exclude the password (for security reason)
        req.user = yield userModel_1.User.findById(decoded.id).select("-password");
        // If the user is found, allow the request to proceed
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
});
exports.protect = protect;
