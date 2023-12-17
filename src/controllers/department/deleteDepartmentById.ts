import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";

import { Department } from "../../models";

const deleteDepartmentById = async (req: Request, res: Response) => {
  try {
    const { department_id } = req.params;
    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: `Department with id '${department_id}' does not exist`,
      });
    }
    await department.deleteOne();
    return res.status(StatusCodes.OK).json({
      status: "success",
      message: `Successfully deleted department with id '${department_id}'`,
    });
  } catch (err: any) {
    if (err instanceof Error.CastError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Invalid department_id",
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default deleteDepartmentById;
