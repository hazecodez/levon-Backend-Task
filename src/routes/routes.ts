import express from "express";

// Import product-related controller functions.
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

// Import user-related controller functions.
import {
  registerUser,
  loginUser,
  userProfile,
} from "../controllers/userController";

// Import middleware for authentication.
import { protect } from "../middleware/authMiddleware";

// Import getWeather controller function.
import { getWeather } from "../controllers/weatherController";

import { postMessage } from "../controllers/messageController";// Import postMessage controller function.

const router = express.Router(); // Create a new instance of the express Router.

router.post("/createProduct", createProduct); // Route for creating a new product.
router.get("/products", getProducts); // Route for fetching all products.
router.get("/product/:id", getProductById); // Route for fetching a single product by ID.
router.put("/updateProduct/:id", updateProduct); // Route for updating a product by ID.
router.delete("/deleteProduct/:id", deleteProduct); // Route for deleting a product by ID.

router.post("/register", registerUser); // Route for user registration.
router.post("/login", loginUser); // Route for user login.

router.get("/profile", protect, userProfile); // Route for fetching user profile, protected by authentication middleware.

router.get("/weather/:place", getWeather); // Weather data fetching route

router.post("/postMessage", postMessage); //post message route

export default router;
