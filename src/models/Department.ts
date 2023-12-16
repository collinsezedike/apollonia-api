import mongoose from "mongoose";

import { IDepartment } from "../utils";

const DepartmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    staff_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Department", DepartmentSchema);
