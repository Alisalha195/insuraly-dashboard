import {supabase} from "../db/connection.js";
import { employeeTable } from "../db/tables.js";

export const createEmployee = async (req , res , next) => {
   
     const { personal_info_id } = req.body;

     const { data, error } = await supabase
     .from(employeeTable)
     .insert({ 
         personal_info_id
      })
      .select()
      if(error)
         res.status(404).json({msg: "error occured"});
      else
         res.status(200).json({data:data})
      
}
export const getEmployee = async (req , res , next) => {
   const {infoData} = req.body;
   const { data, error } = await supabase
  .from(employeeTable)
  .select()
  .eq("personal_info_id",  infoData.personal_info_id)
  
  if(error) {
   res.status(404).json({msg: "Employee not found !"});
  } else {
   if(data.length < 1) {
      res.status(200).json({msg: "not an employee"});
   } else {
      res.status(200).json({data:{...data[0], ...infoData}})
      next()
   }
  }
}

