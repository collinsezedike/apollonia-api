import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Department } from "../../models";

const addNewDepartment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Missing required body parameter",
      });
    }

    const newDepartment = await new Department({ name }).save();
    return res.status(StatusCodes.CREATED).json({
      status: "success",
      data: newDepartment,
    });
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default addNewDepartment;
