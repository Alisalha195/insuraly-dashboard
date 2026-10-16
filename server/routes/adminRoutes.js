// routes/admin.js
import express from 'express';
import { supabase } from "../db/connection.js";
import { getPaginatedAuditLogs , getAuditLogsCount, getUserLogsByEmail, checkIfAdmin, login} from "../controllers/adminController.js";
import { isAdmin } from '../middlewares/admin.js';



const router = express.Router();

router.post('/is-admin',isAdmin ,checkIfAdmin); 

// Initialize Supabase with service role key to bypass RLS for admin tasks

// Middleware to verify the requesting user is an Admin


// GET /api/admin/audit-logs
router.get('/audit-logs',isAdmin ,getPaginatedAuditLogs); 

router.get('/audit-logs/get-count', getAuditLogsCount);

router.post('/audit-logs/user-email' , isAdmin , getUserLogsByEmail);


// router.post("/signup", signup);
router.post("/login" ,login);


export default router;

