import { connectDB, disconnectDB } from "./db";
import { APIKEY, DATABASE_URI, PORT, SERVER_URL } from "./env";
import swaggerJSON from "./swagger.json";

export {
  // Enviroment variables
  PORT,
  APIKEY,
  SERVER_URL,
  DATABASE_URI,

  // DB
  connectDB,
  disconnectDB,

  // Swagger
  swaggerJSON,
};
