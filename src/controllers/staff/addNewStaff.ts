import { Request, Response } from "express";
import { Error } from "mongoose";
import { StatusCodes } from "http-status-codes";

import { Department, Staff } from "../../models";

const addNewStaff = async (req: Request, res: Response) => {
  try {
    const { name, surname, department_id } = req.body;
    if (!name?.trim() || !surname?.trim() || !department_id?.trim()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: "error", message: "Missing required body parameter" });
    }

    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: `Department with id '${department_id}' does not exist`,
      });
    }
    department.staff_count += 1;
    await department.save();

    const newStaff = await new Staff({ name, surname, department_id }).save();
    return res
      .status(StatusCodes.CREATED)
      .json({ status: "success", data: newStaff });
  } catch (err: any) {
    if (err instanceof Error.CastError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Invalid body parameter: department_id",
      });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: err.message });
  }
};

export default addNewStaff;
