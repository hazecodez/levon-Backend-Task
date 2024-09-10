import { createLogger, transports, format } from "winston";

// Create the logger instance
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }), // Logs errors to error.log file
    new transports.File({ filename: "combined.log" }), // Log all logs to 'combined.log'
  ],
});

export default logger;
