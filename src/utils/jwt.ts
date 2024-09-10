import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: '1h', // Token expiration time
  });
  return token;
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
  const secretKey = process.env.JWT_SECRET as string;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
