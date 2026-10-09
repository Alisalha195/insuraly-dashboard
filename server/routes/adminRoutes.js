// routes/admin.js
import express from 'express';
import { supabase } from "../db/connection.js";
import { getPaginatedAuditLogs , getAuditLogsCount} from "../controllers/adminController.js";
import { isAdmin } from '../middlewares/admin.js';



const router = express.Router();



// Initialize Supabase with service role key to bypass RLS for admin tasks

// Middleware to verify the requesting user is an Admin


// GET /api/admin/audit-logs
router.get('/audit-logs',isAdmin ,getPaginatedAuditLogs);

router.get('/audit-logs/get-count', getAuditLogsCount);


export default router;

