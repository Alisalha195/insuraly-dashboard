import { Router } from "express";
import {
  createBusiness,
  editBusiness,
  addEmployeeToBusiness,
  removeEmployeeFromBusiness,
  getAllEmployeesInBusiness,
  getBusinessesCount,
  getPaginatedBusinesses,
  getStages,
  getCommercialTypes,
  getStatuses,
  getBusinessByInsuranceNumber,
  getBusinessByName,
  getPaginatedEmployeesInBusiness,
  getBusinessEmployeesCount,
  getBusinessById,
  setBusinessEmployeesCount,
  getBusinessEmployeesCountMiddleware,
  getBusinessBudgetByID,
} from "../controllers/businessController.js";

import { checkIfEmployee, createEmployee } from "../controllers/employeeController.js";
import { addService } from "../controllers/servicesController.js";
import { addServiceWages } from "../controllers/serviceWagesController.js";
import { checkIfPersonalInfoRecordExistBeforeCreating, createPersonalInfoRecord } from "../controllers/personalInfoController.js";

const router = Router();

router.post("/create", createBusiness);
router.post(
  "/add-employee-to-business",
  checkIfEmployee,
  addEmployeeToBusiness,
  getBusinessEmployeesCountMiddleware ,
  setBusinessEmployeesCount,
  addService,
//   addServiceWages
);

router.post(
   "/create-employee-for-business",
   checkIfPersonalInfoRecordExistBeforeCreating,
   createPersonalInfoRecord,
   createEmployee,

   addEmployeeToBusiness,
   getBusinessEmployeesCountMiddleware ,
   setBusinessEmployeesCount,
   addService,
 //   addServiceWages
 );

router.delete("/remove-employee-from-business", removeEmployeeFromBusiness);

router.post("/get-all-employees", getAllEmployeesInBusiness);
router.get("/get-employees", getPaginatedEmployeesInBusiness);

router.get("/get", getPaginatedBusinesses);
router.get("/get/id",  getBusinessById);
router.get("/get-count", getBusinessesCount);
router.get("/get-employees-count/:businessID", getBusinessEmployeesCount);

router.post("/get/insurance-number", getBusinessByInsuranceNumber);
router.post("/get/name", getBusinessByName);

router.get("/commercialTypes", getCommercialTypes);
router.get("/stages", getStages);
router.get("/statuses", getStatuses);

router.put("/edit", editBusiness);

router.get("/get-budget", getBusinessBudgetByID);

export default router;
