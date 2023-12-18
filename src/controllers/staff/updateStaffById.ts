import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Staff } from "../../models";

const updateStaffById = async (req: Request, res: Response) => {
  try {
    const { name, surname, department_id } = req.body;
    const { staff_id } = req.params;
    const staff = await Staff.findById(staff_id);
    if (!staff) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: `staff with id '${staff_id}' does not exist`,
      });
    }

    staff.name = name?.trim() ? name : staff.name;
    staff.surname = surname?.trim() ? surname : staff.surname;
    staff.department_id = department_id?.trim()
      ? department_id
      : staff.department_id;
    await staff.save();
    return res.status(StatusCodes.OK).json({ status: "success", data: staff });
  } catch (err: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message,
    });
  }
};

export default updateStaffById;
