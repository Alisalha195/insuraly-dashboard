
import { Router } from "express";
import { getAnnualClaims, getClaimsByBusinessInsuranceNumber, getClaimsByBusinessName, getClaimsStats, getPaginatedMonthlyClaims, getPaginatedRetardedClaims, getRetardedClaimsByBusinessInsuranceNumber, getRetardedClaimsByBusinessName, getRunningClaimsCount } from "../controllers/claimsController.js";

const router = Router();

router.get("/getMonthlyClaims", getPaginatedMonthlyClaims);
router.get("/getAnnualClaims", getAnnualClaims);
router.get("/getPaginatedRetardedClaims", getPaginatedRetardedClaims);
router.get("/getClaimsStats", getClaimsStats);

router.post("/get/buisness-name", getClaimsByBusinessName);
router.post("/get/buisness-insurance-number", getClaimsByBusinessInsuranceNumber);

router.post("/retarded/get/buisness-name", getRetardedClaimsByBusinessName);
router.post("/retarded/get/buisness-insurance-number", getRetardedClaimsByBusinessInsuranceNumber);


router.get("/get-count", getRunningClaimsCount);


export default router;
