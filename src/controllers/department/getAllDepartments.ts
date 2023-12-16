import { Request, Response } from "express";

import { Department } from "../../models";
import { StatusCodes } from "http-status-codes";

const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const allDepartments = await Department.find();
    return res
      .status(StatusCodes.OK)
      .json({ status: "success", data: allDepartments });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: err.message });
  }
};

export default getAllDepartments;
