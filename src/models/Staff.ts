import mongoose from "mongoose";

import { IStaff } from "../utils";

const StaffSchema = new mongoose.Schema<IStaff>(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    department_id: { type: mongoose.SchemaTypes.ObjectId },
  },
  { timestamps: true }
);

export default mongoose.model("Staff", StaffSchema);
