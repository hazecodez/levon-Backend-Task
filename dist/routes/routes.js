"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import product-related controller functions.
const productController_1 = require("../controllers/productController");
// Import user-related controller functions.
const userController_1 = require("../controllers/userController");
// Import middleware for authentication.
const authMiddleware_1 = require("../middleware/authMiddleware");
// Import getWeather controller function.
const weatherController_1 = require("../controllers/weatherController");
const messageController_1 = require("../controllers/messageController"); // Import postMessage controller function.
const router = express_1.default.Router(); // Create a new instance of the express Router.
router.post("/createProduct", productController_1.createProduct); // Route for creating a new product.
router.get("/products", productController_1.getProducts); // Route for fetching all products.
router.get("/product/:id", productController_1.getProductById); // Route for fetching a single product by ID.
router.put("/updateProduct/:id", productController_1.updateProduct); // Route for updating a product by ID.
router.delete("/deleteProduct/:id", productController_1.deleteProduct); // Route for deleting a product by ID.
router.post("/register", userController_1.registerUser); // Route for user registration.
router.post("/login", userController_1.loginUser); // Route for user login.
router.get("/profile", authMiddleware_1.protect, userController_1.userProfile); // Route for fetching user profile, protected by authentication middleware.
router.get("/weather/:place", weatherController_1.getWeather); // Weather data fetching route
router.post("/postMessage", messageController_1.postMessage); //post message route
exports.default = router;
