"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// Create the logger instance
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "error.log", level: "error" }), // Logs errors to error.log file
        new winston_1.transports.File({ filename: "combined.log" }), // Log all logs to 'combined.log'
    ],
});
exports.default = logger;
