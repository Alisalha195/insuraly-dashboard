
import { supabase } from "../db/connection.js";

export const authenticated = async (req, res ,next) => {
   console.log("authenticated middleware");
   // const { data: { session } } = await supabase.auth.getSession();
   // console.log("authenticated session : ", session);
   if(session) {
      req.access_token = session?.access_token;
      // console.log("authenticated middleware: user is authenticated, access_token set in req.access_token : ", req.access_token);
      next();
   }
   else {
      res.status(400).send("user is not authenticated")
   }
}