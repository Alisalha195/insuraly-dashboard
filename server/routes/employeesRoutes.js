import { Router } from "express";
import { createEmployee, getEmployee, getEmployeeByID, getEmployeeByNames, getEmployeeByNamesInBusiness, getEmployeeInBusiness, getEmployeeServices } from "../controllers/employeeController.js";
import { 
   createPersonalInfoRecord,
   getPersonalInfoByName,
   getPersonalInfoByNationalNumber,
   getPersonalInfoByInsuranceNumber 
} from "../controllers/personalInfoController.js";
import { addEmployeeToBusiness } from "../controllers/businessController.js";
import { addService, updateService } from "../controllers/servicesController.js";

const router = Router();

//? create employee after creation of related personal information  
// router.post("/create", createPersonalInfoRecord ,createEmployee)

//? get employee by one of three variables (after getting related personal information record)  
router.post("/add-service", addEmployeeToBusiness, addService,);
router.post("/edit-service",updateService);

router.post("/get/national-number", getPersonalInfoByNationalNumber, getEmployeeInBusiness)
router.post("/get/name",  getEmployeeByNamesInBusiness)
router.post("/get/insurance-number", getPersonalInfoByInsuranceNumber , getEmployeeInBusiness)


router.get("/get/id", getEmployeeByID);
router.get("/services",getEmployeeServices);

// router.put("/edit", ,editBusinessOwner)
// router.delete("/delete", deleteBusinessOwner)

export default router;



