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
exports.postMessage = void 0;
const socket_1 = require("../config/socket"); // Import the emitNotification function
const errorClasses_1 = require("../utils/errorClasses");
// to post a message and trigger a notification
const postMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        // Here, we can save the message in the database
        // Emit the notification to all connected clients
        (0, socket_1.emitNotification)("notification", { message: `New message: ${message}` });
        // Return success response
        res
            .status(201)
            .json({ success: true, message: "Message posted successfully" });
    }
    catch (error) {
        return next(new errorClasses_1.DatabaseError("Error posting message"));
    }
});
exports.postMessage = postMessage;
