import { Router } from "express";

import {
  addNewDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
} from "../controllers";

const router = Router();

router.route("/").get(getAllDepartments).post(addNewDepartment);
router
  .route("/:department_id")
  .get(getDepartmentById)
  .put(updateDepartmentById)
  .delete(deleteDepartmentById);

export default router;
