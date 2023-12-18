import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Staff } from "../../models";

const deleteStaffById = async (req: Request, res: Response) => {
  try {
    const { staff_id } = req.params;
    const staff = await Staff.findById(staff_id);
    if (!staff) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: `staff with id '${staff_id}' does not exist`,
      });
    }
    await staff.deleteOne();
    return res.status(StatusCodes.OK).json({
      status: "success",
      message: `Successfully deleted staff with id '${staff_id}'`,
    });
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default deleteStaffById;
