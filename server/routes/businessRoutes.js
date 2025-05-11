
import { Router } from "express";
import { createBusiness, editBusiness, addEmployeeToBusiness, removeEmployeeFromBusiness } from "../controllers/businessController.js";
import { checkIfEmployee } from "../controllers/employeeController.js";
import { addService  } from "../controllers/servicesController.js";
import { addServiceWages  } from "../controllers/serviceWagesController.js";

const router = Router();

router.post("/create", createBusiness)
router.put("/edit", editBusiness)
router.post("/add-employee-to-business", checkIfEmployee ,addEmployeeToBusiness, addService , addServiceWages)

// router.post("remove-employee-from-business" ,removeEmployeeFromBusiness, removeService, removeServiceWages)
router.post("/remove-employee-from-business" ,removeEmployeeFromBusiness)


export default router;