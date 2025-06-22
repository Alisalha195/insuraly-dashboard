import { Router } from "express";
import { createBusinessOwner, getBusinessOwner, getPaginatedBusinessOwners, getBusinessOwnersCount, deleteBusinessOwner } from "../controllers/businessOwnerController.js";
import { 
   createPersonalInfoRecord,
   getPersonalInfoByName,
   getPersonalInfoByNationalNumber,
   getPersonalInfoByInsuranceNumber ,
   deletePersonalInfoRecord,
   checkIfPersonalInfoRecordExistBeforeCreating
} from "../controllers/personalInfoController.js";

const router = Router();

//? create business owner after creation of related personal information  
router.post("/create", checkIfPersonalInfoRecordExistBeforeCreating ,createPersonalInfoRecord ,createBusinessOwner)

//? get business owner by one of three variables (after getting related personal information record)  
router.post("/get/national-number", getPersonalInfoByNationalNumber, getBusinessOwner)
router.post("/get/name", getPersonalInfoByName , getBusinessOwner)
router.post("/get/insurance-number", getPersonalInfoByInsuranceNumber , getBusinessOwner)

router.get("/get", getPaginatedBusinessOwners)
router.get("/get-count", getBusinessOwnersCount)
router.delete("/delete", deleteBusinessOwner)


export default router;



