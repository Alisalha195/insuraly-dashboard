import { Router } from "express";
import { createBusinessOwner } from "../controllers/businessController.js";
import { createPersonalInfoRecord } from "../controllers/personalInfoController.js";

const router = Router();
router.post("/create", createPersonalInfoRecord ,createBusinessOwner)
// router.get("/get", getBusinessOwner)
// router.put("/edit", editBusinessOwner)
// router.delete("/delete", deleteBusinessOwner)

export default router;