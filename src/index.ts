import { serverCreation } from "./config/app";
import { connectDb } from "./config/connectDb";
import * as dotenv from "dotenv";
dotenv.config();

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
