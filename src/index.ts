import { serverCreation } from "./config/app";
import { connectDb } from "./config/connectDb";
import path from "path";
import dotenv from "dotenv";

dotenv.config({path: path.resolve(__dirname, ".env")})

const startServer = async () => {
  try {
    connectDb();
    const server = serverCreation();

    server?.listen(5000, () =>
      console.log(`Server is running ${"http://localhost:5000"}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();