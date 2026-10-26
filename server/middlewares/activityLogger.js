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


// import { supabase } from "../db/connection.js";

// export function activityLogger(actionName, tableName = null) {
//    console.log("🚀 activityLogger initialized for action:", actionName);
   
//    return (req, res, next) => {
//       // 1. Capture request snapshots IMMEDIATELY while the request scope is alive
//       const userId = req.user?.id || null;
//       const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
//       const userAgent = req.headers['user-agent'] || '';
      
//       // Auto-detect record ID if present in body or params
//       const recordId = String(req.body?.id || req.body?.retirementId || req.params?.id || '');

//       // Safely serialize changes to exact JSONB format
//       const auditPayload = {
//          path: req.originalUrl,
//          method: req.method,
//          payload: req.body ? { ...req.body } : {}
//       };

//       // Strip sensitive password fields if auditing auth events
//       if (auditPayload.payload.password) delete auditPayload.payload.password;

//       // 2. Listen for the response finish event to save logs asynchronously
//       res.on('finish', () => {
//          // Only log successful application actions (Status 2xx)
//          if (res.statusCode >= 200 && res.statusCode < 300) {
//             // Self-executing async function prevents blocking the Express thread
//             (async () => {
//                try {
//                   await supabase.from('audit_logs').insert({
//                      user_id: userId,
//                      action: actionName,
//                      table_name: tableName || null,
//                      record_id: recordId || null,
//                      ip_address: String(ipAddress),
//                      user_agent: String(userAgent),
//                      new_data: auditPayload // Native JSON object cleanly maps to JSONB
//                   });
//                } catch (err) {
//                   console.error('⚠️ Critical Audit logging failed:', err.message);
//                }
//             })();
//          }
//       });

//       next();
//    };
// }

import { supabase } from "../db/connection.js";

/**
 * Universally logs user actions to the audit_logs table.
 * @param {string} actionName - The string describing the event (e.g., 'data.update')
 * @param {string|null} tableName - The target database table name
 * @param {function|null} idResolver - Optional function to dynamically extract the exact ID from the req object
 */
export function activityLogger(actionName, tableName = null, idResolver = null) {
   console.log("🚀 activityLogger initialized for action:", actionName);
   
   return (req, res, next) => {
      // 1. Capture request context snapshots immediately while request variables are alive
      const userId = req.user?.id || null;
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';
      const userAgent = req.headers['user-agent'] || '';
      
      let recordId = null;

      // 2. Resolve the table record identifier dynamically
      if (typeof idResolver === 'function') {
         // Explicit resolution mode
         try {
            recordId = idResolver(req);
         } catch (err) {
            console.error('⚠️ Explicit idResolver crashed:', err.message);
         }
      } else {
         // Auto-detect mode: Look through body and parameters for ANY key ending with "id"
         const lookIn = { ...req.params, ...req.body };
         
         // Find a primary key candidate (e.g., businessid, employee_id, id, recordId)
         const pkKey = Object.keys(lookIn).find(key => 
            key.toLowerCase() === 'id' || 
            key.toLowerCase().endsWith('id') || 
            key.toLowerCase().endsWith('_id')
         );

         if (pkKey) {
            recordId = lookIn[pkKey];
         }
      }

      // Format payload payload to valid Postgres JSONB layout structures
      const auditPayload = {
         path: req.originalUrl,
         method: req.method,
         payload: req.body ? { ...req.body } : {}
      };

      if (auditPayload.payload.password) delete auditPayload.payload.password;

      // 3. Queue asynchronous logging after client connection successfully terminates
      res.on('finish', () => {
         if (res.statusCode >= 200 && res.statusCode < 300) {
            (async () => {
               try {
                  await supabase.from('audit_logs').insert({
                     user_id: userId,
                     action: actionName,
                     table_name: tableName || null,
                     record_id: recordId ? String(recordId) : null, // Safely cast to VARCHAR
                     ip_address: String(ipAddress),
                     user_agent: String(userAgent),
                     new_data: auditPayload
                  });
               } catch (err) {
                  console.error(' Critical Application-Layer Audit Logging failed:', err.message);
               }
            })();
         }
      });

      next();
   };
}

