import { supabase } from "../db/connection.js";
import {auditLogsTable} from "../db/tables.js";

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
 
 
 
 export const getAuditLogsCount = async (req, res) => {
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