

import { Router } from "express";
import { deleteService, getFinishedWorkReasons , getServicesCountByEmail, getServicesByEmail} from "../controllers/servicesController.js";

const router = Router();

router.get("/reasons", getFinishedWorkReasons);
router.delete("/delete", deleteService);

router.post("/getServicesCountByEmail", getServicesCountByEmail);
router.post("/getServicesByEmail", getServicesByEmail);

export default router;
