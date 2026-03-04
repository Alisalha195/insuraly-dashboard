
import { Router } from "express";
import {checkIfPersonalInfoRecordExistBeforeCreating, createPersonalInfoRecord , editPersonalInfoRecord,deletePersonalInfoRecord, checkIfPersonalInfoRecordExist, getPersonalInfoByInsuranceNumber, getPersonRules, getPersonalInfoById} from "../controllers/personalInfoController.js";
const router = Router();

router.post("/create", checkIfPersonalInfoRecordExistBeforeCreating ,createPersonalInfoRecord);
router.put("/edit", editPersonalInfoRecord);
router.delete("/delete", deletePersonalInfoRecord);

router.post("/checkIfExist", checkIfPersonalInfoRecordExist );

router.post("/get/insurance-number", getPersonalInfoByInsuranceNumber);

router.get("/get/id", getPersonalInfoById)


router.get("/getPersonRules/personId", getPersonRules);

export default router;