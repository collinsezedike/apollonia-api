import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Staff } from "../../models";

const addNewStaff = async (req: Request, res: Response) => {
  try {
    const { name, surname, department_id } = req.body;
    if (!name?.trim() || !surname?.trim() || !department_id?.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Missing required body parameter",
      });
    }
    const newStaff = await (await new Staff({
      name,
      surname,
      department: department_id,
    }).save()).populate("department", ["_id", "name"]);
    return res.status(StatusCodes.CREATED).json({
      status: "success",
      data: newStaff,
    });
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default addNewStaff;
