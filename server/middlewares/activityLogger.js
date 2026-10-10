// import { logSensitiveRead } from './auditLogger.js'; 

import { supabase } from "../db/connection.js";

export function activityLogger(actionName) {
   console.log("activityLogger initialized for action:", actionName);
  return async (req, res, next) => {
    // log after the response finishes to ensure we don't slow down the user
    res.on('finish', async () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        try {
          await supabase.from('audit_logs').insert({
            user_id: req.user?.id || null,
            action: actionName,
            ip_address: req.ip,
            user_agent: req.headers['user-agent'],
            new_data: { path: req.originalUrl, method: req.method }
          });
        } catch (err) {
          console.error('Audit logging failed:', err);
        }
      }
    });
    next();
  };
}