import mongoose from "mongoose";

import { DATABASE_URI } from ".";

export const connectDB = () => {
  mongoose
    .connect(DATABASE_URI!)
    .then(() => console.log("Successfully connected to database"));
};
