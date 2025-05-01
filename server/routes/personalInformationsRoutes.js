
import { Router } from "express";
import { createPersonalInfoRecord , editPersonalInfoRecord} from "../controllers/personalInfoController.js";
const router = Router();

router.post("/create", createPersonalInfoRecord)
router.put("/edit", editPersonalInfoRecord)

export default router;