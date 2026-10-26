// import { logSensitiveRead } from './auditLogger.js'; 

// import { supabase } from "../db/connection.js";

// export function activityLogger(actionName) {
//    console.log("activityLogger initialized for action:", actionName);
//   return async (req, res, next) => {
//     // log after the response finishes to ensure we don't slow down the user
//     res.on('finish', async () => {
//       if (res.statusCode >= 200 && res.statusCode < 300) {
//         try {
//           await supabase.from('audit_logs').insert({
//             user_id: req.user?.id || null,
//             action: actionName,
//             ip_address: req.ip,
//             user_agent: req.headers['user-agent'],
//             new_data: { path: req.originalUrl, method: req.method }
//           });
//         } catch (err) {
//           console.error('Audit logging failed:', err);
//         }
//       }
//     });
//     next();
//   };
// }


import { supabase } from "../db/connection.js";

export function activityLogger(actionName, tableName = null) {
   console.log("🚀 activityLogger initialized for action:", actionName);
   
   return (req, res, next) => {
      // 1. Capture request snapshots IMMEDIATELY while the request scope is alive
      const userId = req.user?.id || null;
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
      const userAgent = req.headers['user-agent'] || '';
      
      // Auto-detect record ID if present in body or params
      const recordId = String(req.body?.id || req.body?.retirementId || req.params?.id || '');

      // Safely serialize changes to exact JSONB format
      const auditPayload = {
         path: req.originalUrl,
         method: req.method,
         payload: req.body ? { ...req.body } : {}
      };

      // Strip sensitive password fields if auditing auth events
      if (auditPayload.payload.password) delete auditPayload.payload.password;

      // 2. Listen for the response finish event to save logs asynchronously
      res.on('finish', () => {
         // Only log successful application actions (Status 2xx)
         if (res.statusCode >= 200 && res.statusCode < 300) {
            // Self-executing async function prevents blocking the Express thread
            (async () => {
               try {
                  await supabase.from('audit_logs').insert({
                     user_id: userId,
                     action: actionName,
                     table_name: tableName || null,
                     record_id: recordId || null,
                     ip_address: String(ipAddress),
                     user_agent: String(userAgent),
                     new_data: auditPayload // Native JSON object cleanly maps to JSONB
                  });
               } catch (err) {
                  console.error('⚠️ Critical Audit logging failed:', err.message);
               }
            })();
         }
      });

      next();
   };
}
