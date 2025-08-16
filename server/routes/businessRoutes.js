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
} from "../controllers/businessController.js";

import { checkIfEmployee } from "../controllers/employeeController.js";
import { addService } from "../controllers/servicesController.js";
import { addServiceWages } from "../controllers/serviceWagesController.js";

const router = Router();

router.post("/create", createBusiness);
router.post(
  "/add-employee-to-business",
  checkIfEmployee,
  addEmployeeToBusiness,
  addService,
  addServiceWages
);

router.post("/remove-employee-from-business", removeEmployeeFromBusiness);

router.post("/get-all-employees-in-business", getAllEmployeesInBusiness);

router.get("/get", getPaginatedBusinesses);
router.get("/get-count", getBusinessesCount);

router.post("/get/insurance-number", getBusinessByInsuranceNumber);
router.post("/get/name", getBusinessByName);

router.get("/commercialTypes", getCommercialTypes);
router.get("/stages", getStages);
router.get("/statuses", getStatuses);

router.put("/edit", editBusiness);

export default router;
