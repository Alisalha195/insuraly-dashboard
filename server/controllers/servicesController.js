import {supabase} from "../db/connection.js";
import { servicesTable } from "../db/tables.js";

export const addService = async (req , res , next) => {
   const {
      business_employee_id ,
      initiate_start_date ,
      puplic_sector ,
      initiate_registration_date ,
      initiate_registration_number ,
      salary ,
      
   } = req.body;
   
   const {data , error } = await supabase
   .from(servicesTable)
   .insert({
      business_employee_id,
      initiate_start_date ,
      puplic_sector ,
      initiate_registration_date ,
      initiate_registration_number ,
      salary
   })
   .select()
   
   if((data.length > 0) && (!error)) {
      req.body.service_id = data[0].service_id;
      next()
   } else {
      res.status(404).json({msg:"something went wrong"})
   }
   
}
