import { supabase } from "../db/connection.js";
import { userRolesTable } from "../db/tables.js";

/*
export async function isAdmin(req, res, next) {
   // 1. Get token from Authorization header
   const token = req.headers.authorization?.split(' ')[1];
 //   console.log("token in isAdmin middleware : ", token);
   if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return
   }
 
   // 2. Verify token with Supabase Auth
   const { data: { user }, error } = await supabase.auth.getUser(token);
   if (error || !user) {
      res.status(401).json({ error: 'Invalid token' });
      return;
   }
 
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
   if (!isUserAdmin) {
      res.status(403).json({ error: 'Forbidden: Admins only', status : 403 });
      return;
   }
 
   req.user = user; // Attach user to request
   req.isAdmin = true;
   next();
 }
*/

export async function isAdmin(req, res, next) {
   try {
      // 1. Get token from Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
         console.log("Unauthorized: Missing token");
         return res.status(401).json({ error: 'Unauthorized: Missing token', status:401 });
      }
    
      // 2. Verify token with Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user) {
         console.log("Unauthorized: Invalid token");
         return res.status(401).json({ error: 'Unauthorized: Invalid token' , status:401});
      }
    
      // 3. Check if user has an admin role in the database
      const { data, error: dbError } = await supabase
         .from(userRolesTable)
         .select('role')
         .eq('user_id', user.id)
         .maybeSingle(); // Use maybeSingle() to safely handle 0 rows without throwing an error
      
      if (dbError) {
         console.error("Database error checking role:", dbError);
         return res.status(500).json({ error: 'Internal server error checking roles', status:500 });
      }
      
      const isUserAdmin = data?.role === 'admin';
      if (!isUserAdmin) {
         console.log("Forbidden: Admins only");
         return res.status(403).json({ error: 'Forbidden: Admins only' , status:403});
      }
    
      // 4. Attach to request lifecycle and proceed
      req.user = user; 
      req.isAdmin = true;
      return next(); // Always return to ensure execution stops here

   } catch (globalError) {
      console.error("Unexpected middleware error:", globalError);
      return res.status(500).json({ error: 'Internal server error', status:500 });
   }
}
