
// retirement
import { Router } from "express";
import {getRetirementById, getPaginatedAnnualRetirements , getPaginatedMonthlyRetirements, getMonthlyRetirementCount, getAnnualRetirementCount, deleteRetirement, createRetirement, getSalaryReceiptCenters, createRetirementExtending, getRetirementCount, updateRetirement, getRetirementsByNationalNumber, getRetirementsByName, getRetirementsByInsuranceNumber} from "../controllers/retirementController.js";

const router = Router();

router.get("/get/id",  getRetirementById);

router.get("/get-count",  getRetirementCount)
router.get("/getPaginatedAnnualRetirements", getPaginatedAnnualRetirements);
router.get("/getPaginatedMonthlyRetirements", getPaginatedMonthlyRetirements);

router.post("/get/national-number", getRetirementsByNationalNumber); 
router.post("/get/name",  getRetirementsByName);
router.post("/get/insurance-number", getRetirementsByInsuranceNumber);

router.get("/getMonthlyRetirementCount", getMonthlyRetirementCount);
router.get("/getAnnualRetirementCount", getAnnualRetirementCount);
router.get("/receipt-centers", getSalaryReceiptCenters); 

router.post("/create-retirement", createRetirement);
router.post("/create-retirement-extending", createRetirementExtending);
router.post("/update-retirement", updateRetirement);

router.delete("/delete-retirement", deleteRetirement); 


export default router;
