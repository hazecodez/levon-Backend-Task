# Password Generator

This is a password generator application built using React.js. The project was developed to learn and practice React concepts such as state management, custom hooks, and component-based architecture.

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


## Project Structure

- App.jsx: The main entry point of the application that renders the password generator component.
- Components/PassGenerator.jsx: The primary component handling the UI and user interactions for generating passwords.
- Components/PasswordStrengthChecker.jsx: A component that evaluates and displays the strength of the generated password.
- Components/Button.jsx: A reusable button component for handling actions like generating and copying passwords.
- Components/CheckBoxes.jsx: A component that renders checkboxes for selecting password criteria.
- Hooks/usePassGenerator.jsx: A custom hook that manages the password generation logic, including validation and error handling.
- index.css: The styling for the entire application, ensuring a cohesive and visually appealing design.

## How to Run

Clone the project

```bash
  git clone https://github.com/hazecodez/Password-Generator.git
```

Go to the project directory

```bash
  cd Password-Generator
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

- Open your browser and navigate to http://localhost:5173 to play the game.

## Learning Objectives

- Gain experience with React hooks for state and effect management.
- Build a structured React application with reusable components.
- Handle user interactions and update the UI dynamically.
- Implement custom hooks for encapsulating and reusing logic.

## Screenshots

![App Screenshot](/public/Image.png)

## Future Improvements

- Add more customization options like specific character inclusion/exclusion.
- Improve the UI with additional styling or animations.
- Implement a feature to save and manage multiple passwords.
