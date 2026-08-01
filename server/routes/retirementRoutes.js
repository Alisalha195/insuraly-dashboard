
import { Router } from "express";
import { getPaginatedAnnualRetirements , getPaginatedMonthlyRetirements, getMonthlyRetirementCount, getAnnualRetirementCount, deleteRetirement} from "../controllers/retirementController.js";

const router = Router();

router.get("/getPaginatedAnnualRetirements", getPaginatedAnnualRetirements);
router.get("/getPaginatedMonthlyRetirements", getPaginatedMonthlyRetirements);

router.get("/getMonthlyRetirementCount", getMonthlyRetirementCount);
router.get("/getAnnualRetirementCount", getAnnualRetirementCount);

router.delete("/delete-retirement", deleteRetirement);


export default router;