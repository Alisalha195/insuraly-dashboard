import {supabase} from "../db/connection.js";
import { businessOwnerTable } from "../db/tables.js";

export const createBusinessOwner = async (req , res , next) => {
   
     const { personal_info_id } = req.body;

     const { data, error } = await supabase
     .from(businessOwnerTable)
     .insert({ 
         personal_info_id
      })
      .select()
      if(error)
         res.status(404).json({msg:"error occured"});
      else
         res.status(200).json(data)
      
}
export const getBusinessOwner = async (req , res , next) => {
   const {infoData} = req.body;
   const { data, error } = await supabase
  .from(businessOwnerTable)
  .select()
  .eq("personal_info_id",  infoData.personal_info_id)
  
  if(error) {
   res.status(404).json({msg:"business owner not found !"});
  } else {
   if(data.length < 1) {
      res.status(404).json({msg:"not a business owner"});
   } else {
      res.status(200).json({...data[0], ...infoData})
      next()
   }
  }
}

