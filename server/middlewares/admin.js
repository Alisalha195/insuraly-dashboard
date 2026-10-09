import { supabase } from "../db/connection.js";
import { userRolesTable } from "../db/tables.js";


export async function isAdmin(req, res, next) {
   // 1. Get token from Authorization header
   const token = req.headers.authorization?.split(' ')[1];
 //   console.log("token in isAdmin middleware : ", token);
   if (!token) return res.status(401).json({ error: 'Unauthorized' });
 
   // 2. Verify token with Supabase Auth
   const { data: { user }, error } = await supabase.auth.getUser(token);
   if (error || !user) return res.status(401).json({ error: 'Invalid token' });
 
   // 3. Check if user has an admin role (e.g., via app_metadata or a user_roles table)
   
   const {data } = await supabase
   .from(userRolesTable)
   .select('role')
   .eq('user_id', user.id)
   .single();
   
   // console.log("user role data from DB:", data);
   // console.log("user role data current:", user);
   
   
   const isUserAdmin = data?.role === 'admin';
   
   
   // const isUserAdmin = user.app_metadata?.role === 'admin'; 
   if (!isUserAdmin) return res.status(403).json({ error: 'Forbidden: Admins only' });
 
   req.user = user; // Attach user to request
   next();
 }