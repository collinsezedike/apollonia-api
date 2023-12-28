import { connectDB, disconnectDB } from "./db";
import { APIKEY, DATABASE_URI, PORT } from "./env";

export {
  // Enviroment variables
  PORT,
  APIKEY,
  DATABASE_URI,

  // DB
  connectDB,
  disconnectDB,
};
