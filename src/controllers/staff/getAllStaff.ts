import { Request, Response } from "express";

import { Staff } from "../../models";
import { StatusCodes } from "http-status-codes";

const getAllStaff = async (req: Request, res: Response) => {
  try {
    const allStaff = await Staff.find();
    return res
      .status(StatusCodes.OK)
      .json({ status: "success", data: allStaff });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: err.message });
  }
};

export default getAllStaff;
