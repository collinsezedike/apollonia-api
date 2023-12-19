import mongoose from "mongoose";

import { IStaff } from "../utils";

const StaffSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      auto: true,
      cast: [null, (value: any) => `'${value}' is not a valid staff id`],
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Department",
      cast: [null, (value: any) => `'${value}' is not a valid department id`],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStaff>("Staff", StaffSchema);
