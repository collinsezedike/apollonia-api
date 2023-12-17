import mongoose from "mongoose";

import { IDepartment } from "../utils";

const DepartmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Department", DepartmentSchema);
