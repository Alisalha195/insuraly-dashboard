import {supabase} from "../db/connection.js";
import { claimsTable  } from "../db/tables.js";

export const getClaimsCount = async (req, res , next) => {
   const { count, error } = await supabase
   .from(claimsTable).select('*', {count : 'exact' , head:true});
      
   if(count > 0) 
      res.status(200).json({count});
   else if(count < 1)
      res.status(200).json({count:0});
   else 
      res.status(404).json({msg:"something went wrong !"});
}