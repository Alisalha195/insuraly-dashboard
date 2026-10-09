import { supabase } from '../db/connection.js';

export async function authMiddleware(req, res, next) {
   // console.log("authMiddleware called for route:", req.originalUrl);
   // console.log("authMiddleware req :", req.headers.authorization);
  try {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];  
   //  console.log("authMiddleware token :", token); 
   //  console.log("authMiddleware authHeader :", authHeader); 
   //  const token = req.access_token;  

    // 2. Ask Supabase to validate this JWT
    const { data: { user }, error } = await supabase.auth.getUser(token);

    // 3. Handle validation errors
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // 4. Attach the user object to the Express request
    req.user = user;

    // 5. Pass control to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Authentication middleware error:', err);
    return res.status(500).json({ error: 'Internal server authorization error.' });
  }
}
