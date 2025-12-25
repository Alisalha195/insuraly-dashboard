import {supabase} from "../db/connection.js";
import { employeeTable } from "../db/tables.js";

export const createEmployee = async (req , res , next) => {
   
     const { personal_info_id } = req.body;
      // console.log("personal_info_id in createEmployee :", personal_info_id);
      
     const { data, error } = await supabase
     .from(employeeTable)
     .insert({ 
         personal_info_id
      })
      .select("emp_id");
      
      // if employee creation failed, delete the created personal info record
      if(data?.length < 1|| error) {
         const {personal_info_id} = req.body;
         
         const {data:personalData , error:personalError} = await supabase
         .from(personalInfoTable) 
         .delete()
         .select
         .eq('personal_info_id', personal_info_id);
         
         if(personalData?.length < 1  || personalError) 
            res.status(404).json({msg: "error occured", status:404});
         else
            res.status(404).json({msg: "could not create employee",status:404});
         return;
      }
      else {
         // res.status(200).json({data:data})
         req.body.employeeID = data[0]?.emp_id;
         next();
      }
      
}
export const getEmployee = async (req , res , next) => {
   const {personal_informations} = req.body;
   const { data, error } = await supabase
  .from(employeeTable)
  .select()
  .eq("personal_info_id",  personal_informations.personal_info_id)
  
   //   console.log("data in get employee :",data);
  if(error) {
   res.status(404).json({msg: "Employee not found !"});
  } else {
   if(data.length < 1) {
      res.status(200).json({msg: "not an employee"});
   } else {
      res.status(200).json({...data[0], ...personal_informations, status:200})
      next()
   }
  }
}
export const checkIfEmployee = async (req ,res , next) => {
   const {employeeID} = req.body ;
   // console.log("req.body :",req.body);
   
   const {data , error } = await supabase
   .from(employeeTable)
   .select()
   .eq("emp_id" , employeeID);
   
   if((data?.length > 0) && (!error)) {
      next();
   }
   else {
      res.status(404).json({msg:"not an employee", status:404});
      return;
   }
}

