import {supabase} from "../db/connection.js";
import { businessEmployeeTable, serviceFinishReasonsTable, servicesTable } from "../db/tables.js";

export const addService = async (req , res , next) => {
   const {
      business_employee_id ,
      initiateDate ,
      initiateSalary ,
      initiateRegistrationDate ,
      initiateRegistrationNumber ,
      
      finishDate ,
      finishRegistrationDate,
      finishRegistrationNumber,
      finishReason
      
   } = req.body;
   
   const {data:service , error:serviceError } = await supabase
   .from(servicesTable)
   .insert({
      business_employee_id :business_employee_id,
      initiate_start_date :initiateDate ,
      apply_salary : initiateSalary ,
      initiate_registration_date :initiateRegistrationDate,
      initiate_registration_number: initiateRegistrationNumber ,
      
      finish_date : finishDate ? finishDate : null,
      finish_registration_date : finishRegistrationDate? finishRegistrationDate: null,
      finish_registration_number :finishRegistrationNumber ? finishRegistrationNumber : null,
      finish_reason :finishReason ? finishReason : null,
      
   })
   .select();
   
   if((service?.length > 0) && (!serviceError)) {
      req.body.service_id = service[0].service_id;
      console.log("service added successfully with id :", req.body.service_id);
      res.status(200).json({msg:"service added successfully", status:200});
      // next();
   } else {
      
      // check if the business_employee has no services
      const {data:b_e_service, error:b_e_service_error} = await supabase
      .from(servicesTable)
      .select()
      .eq("business_employee_id", business_employee_id);
      console.log("b_e_service in addService rollback check :", b_e_service);
      
      if((b_e_service?.length > 0) && (!b_e_service_error)) {
         console.log("business_employee has other services, cannot roll back the business_employee record");
         
      } else {
         
         const { data:deleted_b_e, error:deleted_b_e_error } = await supabase
        .from(businessEmployeeTable)
        .delete()
        .select()
        .eq('business_employee_id', business_employee_id);
        console.log("deleted_b_e in addService rollback :", deleted_b_e);
        if((deleted_b_e?.length > 0) && (!deleted_b_e_error)) {
           console.log("rolled back business_employee with id :", business_employee_id);
        }
      }
      res.status(400).json({msg:"failed to add service", status:400});
   }
   
}

export const getFinishedWorkReasons = async (req , res , next) => {
   const { data:reasons , error:reasonsError } = await supabase
   .from(serviceFinishReasonsTable)
   .select();
   
   // console.log("data in reasons :",reasons);
   if(reasons?.length > 0 && !reasonsError)
      res.status(200).json({data:reasons, status:200});
   else
      res.status(400).json({msg:"no reasons found", status:400});
}

