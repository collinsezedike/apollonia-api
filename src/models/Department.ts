import mongoose from "mongoose";

import { IDepartment } from "../utils";

const DepartmentSchema = new mongoose.Schema<IDepartment>(
  {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      auto: true,
      cast: [null, (value: any) => `'${value}' is not a valid department id`],
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Department", DepartmentSchema);
