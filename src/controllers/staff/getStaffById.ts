import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Staff } from "../../models";

const getStaffById = async (req: Request, res: Response) => {
  try {
    const { staff_id } = req.params;
    const staff = await Staff.findById(staff_id).populate("department", [
      "_id",
      "name",
    ]);
    if (!staff) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: `staff with id '${staff_id}' does not exist`,
      });
    }
    return res.status(StatusCodes.OK).json({
      status: "success",
      data: staff,
    });
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default getStaffById;
