
import { Router } from "express";
import { createBusiness, editBusiness, addEmployeeToBusiness } from "../controllers/businessController.js";
import { checkIfEmployee } from "../controllers/employeeController.js";
import { addService } from "../controllers/servicesController.js";
import { addServiceWages } from "../controllers/serviceWagesController.js";

const router = Router();

router.post("/create", createBusiness)
router.put("/edit", editBusiness)
router.post("/add-employee-to-business", checkIfEmployee ,addEmployeeToBusiness, addService , addServiceWages)


export default router;