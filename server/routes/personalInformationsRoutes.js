
import { Router } from "express";
import { createPersonalInfoRecord } from "../controllers/personalInfoController.js";
const router = Router();

router.post("/create", createPersonalInfoRecord)

export default router;