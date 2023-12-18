import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";

import { Department } from "../../models";

const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const { department_id } = req.params;
    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: `Department with id '${department_id}' does not exist`,
      });
    }
    return res.status(StatusCodes.OK).json({
      status: "success",
      data: department,
    });
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default getDepartmentById;
