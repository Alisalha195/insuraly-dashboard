
import { Router } from "express";
import { addServiceWages, updateServiceWages, saveServiceWages, getWagesByServiceID } from "../controllers/serviceWagesController.js";

const router = Router();

// router.post("/save"  , updateServiceWages); 
router.post("/save"  , saveServiceWages);
router.get("/getWagesByServiceID"  , getWagesByServiceID);


export default router;