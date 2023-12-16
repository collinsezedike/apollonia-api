import { Types } from "mongoose";

export interface IDepartment {
  name: string;
  staff_count: number;
}

export interface IStaff {
  name: string;
  surname: string;
  department: Types.ObjectId;
}
