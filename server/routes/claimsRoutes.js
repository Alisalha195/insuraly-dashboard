
import { Router } from "express";
import { getAnnualClaims, getClaimsStats, getPaginatedMonthlyClaims, getPaginatedRetardedClaims, getRunningClaimsCount } from "../controllers/claimsController.js";

const router = Router();

router.get("/getMonthlyClaims", getPaginatedMonthlyClaims);
router.get("/getAnnualClaims", getAnnualClaims);
router.get("/getPaginatedRetardedClaims", getPaginatedRetardedClaims);
router.get("/getClaimsStats", getClaimsStats);



router.get("/get-count", getRunningClaimsCount);


export default router;
