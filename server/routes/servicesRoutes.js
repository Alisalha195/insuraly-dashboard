

import { Router } from "express";
import { getFinishedWorkReasons } from "../controllers/servicesController.js";

const router = Router();

router.get("/reasons", getFinishedWorkReasons);

export default router;
