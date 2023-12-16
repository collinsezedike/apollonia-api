import { Router } from "express";

import {
  addNewStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
} from "../controllers";

const router = Router();

router.route("/").get(getAllStaff).post(addNewStaff);
router
  .route("/:staff_id")
  .get(getStaffById)
  .put(updateStaffById)
  .delete(deleteStaffById);

export default router;
