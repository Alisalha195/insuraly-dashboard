
// retirement
import { Router } from "express";
import { getPaginatedAnnualRetirements , getPaginatedMonthlyRetirements, getMonthlyRetirementCount, getAnnualRetirementCount, deleteRetirement, createRetirement, getSalaryReceiptCenters, createRetirementExtending, getRetirementCount} from "../controllers/retirementController.js";

const router = Router();

router.get("/get-count",  getRetirementCount)
router.get("/getPaginatedAnnualRetirements", getPaginatedAnnualRetirements);
router.get("/getPaginatedMonthlyRetirements", getPaginatedMonthlyRetirements);

router.get("/getMonthlyRetirementCount", getMonthlyRetirementCount);
router.get("/getAnnualRetirementCount", getAnnualRetirementCount);
router.get("/receipt-centers", getSalaryReceiptCenters);

router.post("/create-retirement", createRetirement);
router.post("/create-retirement-extending", createRetirementExtending);

router.delete("/delete", deleteRetirement);


export default router;
