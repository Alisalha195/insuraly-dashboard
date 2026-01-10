

import { Router } from "express";
import { deleteService, getFinishedWorkReasons } from "../controllers/servicesController.js";

const router = Router();

router.get("/reasons", getFinishedWorkReasons);
router.delete("/delete", deleteService);

export default router;
