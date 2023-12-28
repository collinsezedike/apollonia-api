import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { APIKEY } from "../config";

const validateAPIToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = req.headers.authorization;
    if (!apiKey || apiKey !== APIKEY) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        message: "Missing or invalid API key",
      });
    }
    next();
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default validateAPIToken;
