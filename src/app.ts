import cors from "cors";
import express, { Request, Response } from "express";

import { validateAPIToken } from "./middlewares";
import { departmentRouter, staffRouter } from "./routes";

export default () => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(validateAPIToken);

  // Routes
  app.use("/api/v1/departments", departmentRouter);
  app.use("/api/v1/staffs", staffRouter);

  // Base URL
  app.get("/", (req: Request, res: Response) => res.send("Apollonia 🚀🚀🚀"));

  return app;
};
