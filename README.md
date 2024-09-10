# Levon-Backend-Task


## Folder Structure:

- src/
    - config/ - Configuration files.
        - app.ts - Sets up the Express application and middleware.
        - connectDb.ts - Handles database connection.
        - socket.ts - Configures Socket.IO.
    - controllers/ - Contains controllers for handling requests and responses.
        - userController.ts - Handles user-related operations.
        - productController.ts - Handles product-related operations.
        - weatherController.ts - Handles weather data fetching.
        - messageController.ts - Handles messaging.
    - middleware/ - Contains middleware functions.
        - authMiddleware.ts - Middleware for user authentication.
        - errorMiddleware.ts - Global error handling middleware.
    - models/ - Contains Mongoose models for MongoDB.
        - productModel.ts - Defines the Product schema.
        - userModel.ts - Defines the User schema.
    - routes/ - Defines the application routes.
        - routes.ts - Contains all the routes for different endpoints.
    - utils/ - Utility functions and classes.
        - encryption.ts - Functions for hashing and comparing passwords.
        - errorClasses.ts - Custom error classes.
        - jwt.ts - Functions for generating and verifying JWT tokens.
        - logger.ts - Logger configuration.
    - index.ts - Entry point for the application.

## How to Run

Clone the repository to your local machine

```bash
  git clone https://github.com/hazecodez/levon-Backend-Task.git
```

Go to the project directory

```bash
  cd levon-Backend-Task
```

Install dependencies

```bash
  npm install
```

Create a .env file in the root directory and add your environment variables:

```bash
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  WEATHER_API_ID=your_weather_api_key

```

Start the server

```bash
  npm run dev
```

- The server will be running on http://localhost:5000.

## API Endpoints

#### User Routes

Register a new user.
```http
  POST /register
```
Login a user.
```http
  POST /login
```
Get the user profile (authenticated)
```http
  GET /profile
```
#### Product Routes

Create a new product.
```http
  POST /createProduct
```
Get all products.
```http
  GET /products
```
Get a product by ID.
```http
  GET /product/:id
```
Update a product by ID
```http
  PUT /updateProduct/:id
```
Delete a product by ID
```http
  DELETE /deleteProduct/:id
```

#### Weather Routes

Get weather information for a place
```http
  GET /weather/:place
```

#### Messaging Routes

Post a new message
```http
  POST /postMessage
```