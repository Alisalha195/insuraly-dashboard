import { Router } from "express";
import { createEmployee, getEmployee } from "../controllers/employeeController.js";
import { 
   createPersonalInfoRecord,
   getPersonalInfoByName,
   getPersonalInfoByNationalNumber,
   getPersonalInfoByInsuranceNumber 
} from "../controllers/personalInfoController.js";

const router = Router();

//? create business owner after creation of related personal information  
router.post("/create", createPersonalInfoRecord ,createEmployee)

//? get business owner by one of three variables (after getting related personal information record)  
router.post("/get/national-number", getPersonalInfoByNationalNumber, getEmployee)
router.post("/get/name", getPersonalInfoByName , getEmployee)
router.post("/get/insurance-number", getPersonalInfoByInsuranceNumber , getEmployee)

// router.put("/edit", ,editBusinessOwner)
// router.delete("/delete", deleteBusinessOwner)

export default router;



