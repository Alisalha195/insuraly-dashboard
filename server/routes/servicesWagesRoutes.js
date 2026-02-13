
import { Router } from "express";
import { addServiceWages, updateServiceWages, saveServiceWages } from "../controllers/serviceWagesController.js";

const router = Router();

// router.post("/save"  , updateServiceWages);
router.post("/save"  , saveServiceWages);


export default router;