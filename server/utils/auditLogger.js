
import { supabase } from "../db/connection.js";

export async function logSensitiveRead(req, action, tableName, recordId = null) {
  const userId = req.user?.id || null; 
  
//   console.log("req.ip:", req.ip);
//   console.log("req.headers['user-agent']:",req.headers['user-agent']);
//   console.log(`Logging sensitive read action: ${action} on table: ${tableName} for user: ${userId}`);
  const {data, error} = await supabase.from('audit_logs').insert ({
    user_id: userId,
    action: `data.select.${action}`,
    table_name: tableName,
    record_id: recordId,
    ip_address: req.ip,
    user_agent: req.headers['user-agent']
  }).select();
  
  console.log("Audit log insert result:", {data, error});
  if (error) {
    console.error("Error logging sensitive read action:", error);
  }
  
}
