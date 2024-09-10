"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        mongoose_1.default
            .connect(mongoURI)
            .then(() => {
            console.log("Database connected successfully");
        })
            .catch((error) => {
            console.log("DB connection error:", error);
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDb = connectDb;
