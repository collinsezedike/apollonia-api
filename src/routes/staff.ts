import { Router } from "express";

import { addNewStaff, getAllStaff } from "../controllers";

const router = Router();

router.route("/").get(getAllStaff).post(addNewStaff);

export default router;
