import {supabase} from "../db/connection.js";
import { servicesWagesTable } from "../db/tables.js";

export const addServiceWages = async (req , res , next) => {
   const { 
      service_id , 
      initiate_start_date ,
      initiate_registration_number ,
      is_initiative ,
      salary
   } = req.body;
   
   const {data , error} = await supabase
   .from(servicesWagesTable)
   .insert({
      service_id: service_id ,
      service_wage_date : initiate_start_date,
      wage_registration_number : initiate_registration_number ,
      wage_amount : salary ,
      is_initiative : is_initiative
   })
   .select();
   
   if((data.length > 0) && (!error)) {
      res.status(200).json({msg : "service added successfuly !"});
   } else {
      res.status(404).json({msg : "something went wrong !"});
   }
   
}