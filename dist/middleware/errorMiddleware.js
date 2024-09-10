"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger")); // Import the logger to log errors
// Middleware function to handle errors globally
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    logger_1.default.error(`${err.message} - ${req.method} ${req.url}`);
    // Send the error response back to the client
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
exports.default = globalErrorHandler;
