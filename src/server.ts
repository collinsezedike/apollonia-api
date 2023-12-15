import express, { Request, Response } from "express";

import { connectDB, PORT } from "./config";

const app = express();

app.get("/", (req: Request, res: Response) => res.send("Apollonia 🚀🚀🚀"));

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

startServer();
