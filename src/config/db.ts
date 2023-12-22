import mongoose from "mongoose";

export const connectDB = (database_uri: string) => {
  mongoose
    .connect(database_uri)
    .then(() => console.log("Successfully connected to database"));
};

export const disconnectDB = () => {
  mongoose
    .disconnect()
    .then(() => console.log("Database disconnected successfully"));
};
