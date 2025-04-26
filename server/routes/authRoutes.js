import { Router } from "express";
import {signup , login , logout} from "../controllers/authController.js"
import { authenticated } from "../middlewares/authenticated.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",authenticated, logout);

export default router;