

import { Router } from "express";
import { deleteService, getFinishedWorkReasons , getServicesCountByEmail} from "../controllers/servicesController.js";

const router = Router();

router.get("/reasons", getFinishedWorkReasons);
router.delete("/delete", deleteService);

router.post("/getServicesCountByEmail", getServicesCountByEmail);

export default router;
