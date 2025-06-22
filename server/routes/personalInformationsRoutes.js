
import { Router } from "express";
import {checkIfPersonalInfoRecordExistBeforeCreating, createPersonalInfoRecord , editPersonalInfoRecord,deletePersonalInfoRecord, checkIfPersonalInfoRecordExist} from "../controllers/personalInfoController.js";
const router = Router();

router.post("/create", checkIfPersonalInfoRecordExistBeforeCreating ,createPersonalInfoRecord)
router.put("/edit", editPersonalInfoRecord)
router.delete("/delete", deletePersonalInfoRecord)

router.post("/checkIfExist", checkIfPersonalInfoRecordExist )


export default router;