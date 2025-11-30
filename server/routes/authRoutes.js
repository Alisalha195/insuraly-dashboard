import { Router } from "express";
import {signup , login , logout} from "../controllers/authController.js"
import { authenticated } from "../middlewares/authenticated.js";
import {createUser} from "../controllers/userController.js";

const router = Router();  
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;