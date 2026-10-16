import { supabase } from "../db/connection.js";
import {auditLogsTable, userRolesTable} from "../db/tables.js";

// export const login = async (req , res , next) => {
//    const email = req.body.email
//    const password = req.body.password
   
   
//    const {data: userRoleData } = await supabase
//    .from(userRolesTable)
//    .select('role')
//    .eq('email', email)
//    .single();
   
//    console.log("user role record is :",userRoleData);
   
   
//    console.log("admin login controller reached");
//    console.log("email:", email);
//    // console.log("password:",password);
   
//       const {data: {session}} = await supabase.auth.getSession()
//       // if(session) await supabase.auth.signOut()
//       if(!session) {
         
         
//          if(userRoleData?.role == "admin") {
//             const { data: {user} } = await supabase.auth.signInWithPassword({
//                email: email,
//                password: password,
//             })
//             if(user) {
//                const {data: {session}} = await supabase.auth.getSession();
//                // console.log("user after login:", session);
//                res.status(200).json({msg:"user logged in successfuly  !" , status:200 , session});
//                // next();
//                return
//             } else {
//                res.status(400).json({msg:"wrong password or email  !" , status:400});
//                return
//             }
//          } else if(userRoleData?.role == "user") {
//             // res.status(400).json({msg:"UnAuthorized ! user is not an admin." , status:400});
//             // return
            
            
            
//          }
         
//       } else {
//          // console.log("user allready logged in:", session);
//          res.status(400).json({msg:"user allready logged in  !!" , status:400});
//          return
//       }
      
// }
export const checkIfAdmin = (req, res) => {
   const user = req?.user;
   const isAdmin = req?.isAdmin;
   
   if(user && isAdmin) {
      res.status(200).json({isAdmin: true, status: 200});
   }
   res.status(403).json({isAdmin: false, status: 403});
   
}


export const login = async (req , res , next) => {
   const email = req.body.email
   const password = req.body.password
   
   
   const {data: userRoleData } = await supabase
   .from(userRolesTable)
   .select('role')
   .eq('email', email)
   .single();
   
   console.log("user role record is :",userRoleData);
   
   
   console.log("admin login controller reached");
   console.log("email:", email);
   // console.log("password:",password);
   
      const {data: {session}} = await supabase.auth.getSession()
      // if(session) await supabase.auth.signOut()
      if(!session) {
         
         const { data: {user} } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
         })
         if(user) {
            const {data: {session}} = await supabase.auth.getSession();
            if(userRoleData?.role == "admin") {
               res.status(200).json({msg:"admin logged in successfuly  !" , status:200 , session});
               return;
               
            } else if(userRoleData?.role == "user") {
               res.status(200).json({msg:"user logged in successfuly  !" , status:201 , session});
               return;
            }
         }
         
      } else {
         // console.log("user allready logged in:", session);
         res.status(400).json({msg:"user allready logged in  !!" , status:400});
         return
      }
      
}


export const getPaginatedAuditLogs = async (req, res) => {
   const { page = 1, pageSize = 10, search, action, userId } = req.query;
      
   const from = (page - 1) * pageSize;
   const to = (from + Number(pageSize) ) -1 ;
 
   // Build the base query
   let query = supabase
     .from(auditLogsTable)
     .select(`
               *,
                user_id:profiles!inner (
                  email
                )
             `
      , { count: 'exact' }) // Joins auth schema to get user email
     .order('created_at', { ascending: false })
     .range(from, to);
 
   // Apply optional filters
   if (action) query = query.eq('action', action);
   if (userId) query = query.eq('user_id', userId);
   if (search) query = query.islike('table_name', `%${search}%`);
 
   const { data, count, error } = await query;
 
   if (error) return res.status(400).json({ error: error.message });
 
   res.json({
     logs: data,
     totalCount: count,
     totalPages: Math.ceil(count / pageSize),
     currentPage: parseInt(page)
   });
 };
 
 
 
 export const getAuditLogsCount = async (req, res, next) => {
   const { error, count } = await supabase  
     .from(auditLogsTable)
     .select('*', { count: 'exact', head: true });
     
     if (count > 0) res.status(200).json({ count });
     else if (count < 1) res.status(200).json({ count: 0 });
     else res.status(404).json({ msg: "something went wrong !" });
 }
 
 export const getUserLogsByEmail = async (req, res) => {
   
   const {searchValue} = req.body;
   
   console.log("search Value :: ",searchValue);
   
   const { data, error } = await supabase
   .from(auditLogsTable)
   .select(`
      *,
       user_id:profiles!inner (
         email
       )
    `
   , { count: 'exact' }) 
   .eq('profiles.email', searchValue);
   
   
   console.log("data for getUserLogsByEmail :: ",data);
   
   
   if(error) {
      res.status(404).json({msg:"user has no logs !", status:404 });
   } else {
      if(data.length < 1) {
         res.status(400).json({msg:"user has no logs !!", status:400});
      } else {
         res.status(200).json({data , status:200});
         next()
      }
   }
   
 }