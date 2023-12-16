import { connectDB } from "./db";
import { DATABASE_URI, PORT } from "./env";

export {
  // Enviroment variables
  PORT,
  DATABASE_URI,

  // DB
  connectDB,
};
