import { Router } from "express";
import { createEmployee, getEmployee, getEmployeeByNames, getEmployeeByNamesInBusiness, getEmployeeInBusiness } from "../controllers/employeeController.js";
import { 
   createPersonalInfoRecord,
   getPersonalInfoByName,
   getPersonalInfoByNationalNumber,
   getPersonalInfoByInsuranceNumber 
} from "../controllers/personalInfoController.js";
import { addEmployeeToBusiness } from "../controllers/businessController.js";
import { addService } from "../controllers/servicesController.js";

const router = Router();

//? create business owner after creation of related personal information  
router.post("/create", createPersonalInfoRecord ,createEmployee)

//? get business owner by one of three variables (after getting related personal information record)  
router.post("/get/national-number", getPersonalInfoByNationalNumber, getEmployeeInBusiness)
router.post("/get/name",  getEmployeeByNamesInBusiness)
router.post("/get/insurance-number", getPersonalInfoByInsuranceNumber , getEmployeeInBusiness)

router.post("/add-service", addEmployeeToBusiness, addService,)

// router.put("/edit", ,editBusinessOwner)
// router.delete("/delete", deleteBusinessOwner)

export default router;



