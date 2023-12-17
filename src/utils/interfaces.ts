import { Types } from "mongoose";

export interface IDepartment {
  name: string;
}

export interface IStaff {
  name: string;
  surname: string;
  department_id: Types.ObjectId;
}
