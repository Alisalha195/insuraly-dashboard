import { Router } from "express";
import { createBusinessOwner, getBusinessOwner } from "../controllers/businessOwnerController.js";
import { 
   createPersonalInfoRecord,
   getPersonalInfoByName,
   getPersonalInfoByNationalNumber,
   getPersonalInfoByInsuranceNumber 
} from "../controllers/personalInfoController.js";

const router = Router();

//? create business owner after creation of related personal information  
router.post("/create", createPersonalInfoRecord ,createBusinessOwner)

//? get business owner by one of three variables (after getting related personal information record)  
router.post("/get/national-number", getPersonalInfoByNationalNumber, getBusinessOwner)
router.post("/get/name", getPersonalInfoByName , getBusinessOwner)
router.post("/get/insurance-number", getPersonalInfoByInsuranceNumber , getBusinessOwner)

// router.put("/edit", ,editBusinessOwner)
// router.delete("/delete", deleteBusinessOwner)

export default router;



