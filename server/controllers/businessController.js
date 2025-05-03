import {supabase} from "../db/connection.js";
import { businessTable, businessEmployeeTable  } from "../db/tables.js";

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

export const addEmployeeToBusiness = async (req , res , next) => {
   
   const {businessId , employeeId } = req.body;
 
   const {data , error} = await supabase
   .from(businessEmployeeTable)
   .insert({
      business_id : businessId,
      employee_id: employeeId
   })
   .select()
   
   if((data.length > 0 ) && (!error)) {
      req.body.business_employee_id = data[0].business_employee_id;
      next();
   } else {
      res.status(404).json({msg: "something went wrong  !"});
   }
   

   
   
    
}

