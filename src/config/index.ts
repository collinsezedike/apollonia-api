import { connectDB, disconnectDB } from "./db";
import { APIKEY, DATABASE_URI, PORT, SERVER_URL } from "./env";

export {
  // Enviroment variables
  PORT,
  APIKEY,
  SERVER_URL,
  DATABASE_URI,

  // DB
  connectDB,
  disconnectDB,
};
