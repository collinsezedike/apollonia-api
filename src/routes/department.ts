import { Router } from "express";

import { addNewDepartment, getAllDepartments } from "../controllers";

const router = Router();

router.route("/").get(getAllDepartments).post(addNewDepartment);

export default router;
