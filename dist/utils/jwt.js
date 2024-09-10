"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to generate a JWT token
const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ id: userId }, secretKey, {
        expiresIn: '1h', // Token expiration time
    });
    return token;
};
exports.generateToken = generateToken;
// Function to verify a JWT token
const verifyToken = (token) => {
    const secretKey = process.env.JWT_SECRET;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
exports.verifyToken = verifyToken;
