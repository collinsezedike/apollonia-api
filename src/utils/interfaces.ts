import { Types } from "mongoose";

export interface IDepartment {
  _id: Types.ObjectId;
  name: string;
}

export interface IStaff {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  department_id: Types.ObjectId;
}
