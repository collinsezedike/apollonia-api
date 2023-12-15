import mongoose from "mongoose";

import { DATABASE_URI } from ".";

export const connectDB = async () => {
  const conn = mongoose.createConnection(DATABASE_URI!);
  conn.on("connected", () => console.log("Successfully connected to database"));
};
