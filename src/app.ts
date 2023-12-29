import cors from "cors";
import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";

import { validateAPIToken } from "./middlewares";
import { departmentRouter, staffRouter } from "./routes";
import swaggerJSON from "../swagger.json";

export default () => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/v1/departments", validateAPIToken, departmentRouter);
  app.use("/api/v1/staffs", validateAPIToken, staffRouter);
  app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

  // Base URL
  app.get("/", (req: Request, res: Response) => res.send("Apollonia 🚀🚀🚀"));

  return app;
};
