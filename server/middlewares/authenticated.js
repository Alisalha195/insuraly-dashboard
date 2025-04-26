
import { supabase } from "../db/connection.js";

export const authenticated = async (req, res ,next) => {
   
   const { data: { session } } = await supabase.auth.getSession()
   if(session) {
      next();
   }
   else {
      res.status(400).send("user is not authenticated")
   }
}