
import { Router } from "express";
import { createPersonalInfoRecord , editPersonalInfoRecord,deletePersonalInfoRecord} from "../controllers/personalInfoController.js";
const router = Router();

router.post("/create", createPersonalInfoRecord)
router.put("/edit", editPersonalInfoRecord)
router.delete("/delete", deletePersonalInfoRecord)

export default router;