// Base Error Class
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

// Validation Error
class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

// Database Error
class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}


export { AppError, ValidationError, DatabaseError };
