
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authenticated } from "../middlewares/authenticated.js";

import {checkIfPersonalInfoRecordExistBeforeCreating, createPersonalInfoRecord , editPersonalInfoRecord,deletePersonalInfoRecord, checkIfPersonalInfoRecordExist, getPersonalInfoByInsuranceNumber, getPersonRules, getPersonalInfoById, getPersonalRecord} from "../controllers/personalInfoController.js";
import { activityLogger } from "../middlewares/activityLogger.js";
const router = Router();

router.post("/create", checkIfPersonalInfoRecordExistBeforeCreating ,createPersonalInfoRecord);
router.put("/edit", editPersonalInfoRecord);
router.delete("/delete", deletePersonalInfoRecord);

router.post("/checkIfExist", checkIfPersonalInfoRecordExist );

router.post("/get/insurance-number", getPersonalInfoByInsuranceNumber, getPersonalRecord);

router.get("/get/id",authMiddleware ,getPersonalInfoById)


router.get("/getPersonRules/personId",activityLogger('person.PersonRules_initiated') ,getPersonRules);

export default router;