
import { Router } from "express";
import { deathAfterRetirement } from "../controllers/retirementController.js";

const router = Router();

router.post("/deathAfterRetirement",deathAfterRetirement)

export default router;