import { Router } from "express";

import {
  addNewDepartment,
  getAllDepartments,
  getDepartmentById,
} from "../controllers";

const router = Router();

router.route("/").get(getAllDepartments).post(addNewDepartment);
router.route("/:department_id").get(getDepartmentById);

export default router;
