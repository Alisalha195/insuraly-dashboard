
import { Router } from "express";
import {   getUsers, getUser } from "../controllers/userController.js"; 

const router = Router();

router.get("/get-user", getUser);
router.get("/get-users", getUsers);

export default router;