import {supabase} from "../db/connection.js";
import { businessTable } from "../db/tables.js";

export const createBusiness = async (req, res , next) => {
   const {
      business_owner_id,
      business_name ,
      registration_date ,
      registration_number ,
      financial_balance ,
      is_self_insurance
   } = req.body;
   
   const { data , error } = await supabase
     .from(businessTable)
     .insert({ 
         business_owner_id ,
         business_name ,
         registration_date ,
         registration_number ,
         financial_balance ,
         is_self_insurance
      })
      .select();
      
      if(error)
         res.status(400).send("error occured");
      else
         res.status(200).json(data);
   
}

export const editBusiness = async (req, res , next) => {
   const {
      business_id ,
      business_owner_id,
      business_name ,
      registration_date ,
      registration_number ,
      financial_balance ,
      is_self_insurance
   } = req.body;
   
   const { data , error } = await supabase
     .from(businessTable)
     .update({ 
         business_owner_id ,
         business_name ,
         registration_date ,
         registration_number ,
         financial_balance ,
         is_self_insurance
      })
      .eq('business_id', business_id)
      .select();
      
      if(error)
         res.status(400).send("error occured");
      else
         res.status(200).json(data);
}