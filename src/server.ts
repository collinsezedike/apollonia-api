import express, { Request, Response } from "express";

import { PORT } from "./config";

const app = express();

app.get("/", (req: Request, res: Response) => res.send("Apollonia 🚀🚀🚀"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
