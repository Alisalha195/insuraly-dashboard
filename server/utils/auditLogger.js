
// import { supabase } from "../db/connection.js";

// export async function logSensitiveRead(req, action, tableName, recordId = null) {
//   const userId = req.user?.id || null; 
  
// //   console.log("req.ip:", req.ip);
// //   console.log("req.headers['user-agent']:",req.headers['user-agent']);
// //   console.log(`Logging sensitive read action: ${action} on table: ${tableName} for user: ${userId}`);
//   const {data, error} = await supabase.from('audit_logs').insert ({
//     user_id: userId,
//     action: `data.select.${action}`,
//     table_name: tableName,
//     record_id: recordId,
//     ip_address: req.ip,
//     user_agent: req.headers['user-agent']
//   }).select();
  
//   console.log("Audit log insert result:", {data, error});
//   if (error) {
//     console.error("Error logging sensitive read action:", error);
//   }
  
// }

import { supabase } from "../db/connection.js";

export async function logSensitiveRead(req, action, tableName, recordId = null) {
  // Capture values instantly
  const userId = req.user?.id || null; 
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
  const userAgent = req.headers['user-agent'] || '';

  try {
     const { data, error } = await supabase.from('audit_logs').insert({
       user_id: userId,
       action: `data.select.${action}`,
       table_name: tableName,
       record_id: recordId ? String(recordId) : null, // Forces Postgres VARCHAR format matching
       ip_address: String(ipAddress),
       user_agent: String(userAgent)
     });
     
     if (error) {
        console.error("❌ Error logging sensitive read action:", error.message);
     }
  } catch (err) {
     console.error("⚠️ System failure trying to log sensitive read:", err.message);
  }
}

