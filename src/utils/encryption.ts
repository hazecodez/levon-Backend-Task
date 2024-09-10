import bcrypt from "bcrypt";

// Hash password before saving
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Compare user password with hashed password
export const comparePasswords = async (
  userPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
