import express, { Request, Response } from "express";

import { connectDB, PORT } from "./config";
import { departmentRouter, staffRouter } from "./routes";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/staffs", staffRouter);

app.get("/", (req: Request, res: Response) => res.send("Apollonia 🚀🚀🚀"));

const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (err: any) {
    console.error(err);
  }
};

startServer();
