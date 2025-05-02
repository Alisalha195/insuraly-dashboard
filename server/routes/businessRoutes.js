
import { Router } from "express";
import { createBusiness, editBusiness } from "../controllers/businessController.js";

const router = Router();

router.post("/create", createBusiness)
router.put("/edit", editBusiness)

export default router;