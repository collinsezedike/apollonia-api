import cors from "cors";
import express, { Request, Response } from "express";

import { departmentRouter, staffRouter } from "./routes";

export default () => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/v1/departments", departmentRouter);
  app.use("/api/v1/staffs", staffRouter);

  // Base URL
  app.get("/", (req: Request, res: Response) => res.send("Apollonia 🚀🚀🚀"));

  return app;
};
