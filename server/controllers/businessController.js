import {supabase} from "../db/connection.js";
import { businessTable, businessEmployeeTable, businessStagesTable ,businessCommercialTypesTable ,businessStatusesTable } from "../db/tables.js";

export const createBusiness = async (req, res , next) => {
   const {
      businessOwnerId,
      businessName ,
      city,
      country,
      commercialType,
      lawInitiativeDate,
      stage,
      status
   } = req.body;
   // console.log("req.body :",req.body);
   
   const { data , error } = await supabase
     .from(businessTable)
     .insert({ 
         business_owner_id: businessOwnerId,
         business_name :businessName ,
         registration_date : new Date(Date.now()) ,
         registration_number : 1 ,
         stage: stage ,
         status: status ,
         state:city ,
         country: country ,
         commercial_type : commercialType ,
         law_initiative_date: lawInitiativeDate
      })
      .select();
      console.log("data :",data)
      if(error || data?.length < 1)
         res.status(400).json({msg:"error occured", status:400});
      else
         res.status(200).json({...data, status: 200});
   
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
   
   if((data?.length > 0 ) && (!error)) {
      req.body.business_employee_id = data[0].business_employee_id;
      next();
   } else {
      res.status(404).json({msg: "something went wrong...!"});
   }
   
}

export const removeEmployeeFromBusiness = async (req , res, next) => {
   
   const {employeeId, businessId} = req.body;
   const {data , error} = await supabase
   .from(businessEmployeeTable)
   .delete()
   .eq("employee_id", employeeId)
   .eq("business_id",businessId) ;
   
   if(!error) {
      // req.body.business_employee_id = data[0].business_employee_id;
      // next();
      res.status(200).json({msg: "employee removed from business successfuly  !"});
   } else {
      res.status(404).json({msg: "something went wrong  !"});
   }
}

export const getAllEmployeesInBusiness = async (req, res, next) => {
   const {businessId} = req.body;
   
   const {data, error} = await supabase
   .from(businessEmployeeTable)
   .select()
   .eq("business_id",businessId);
}

export const getBusinessesCount = async (req, res , next) => {
   const { count, error } = await supabase
   .from(businessTable).select('*', {count : 'exact' , head:true});
   
   if(count > 0) 
      res.status(200).json({count});
   else if(count < 1)
      res.status(200).json({count:0});
   else 
      res.status(404).json({msg:"something went wrong !"});
}

export const getPaginatedBusinesses = async (req, res, next) => {
   const {page, pageSize} = req.query;
   const from = (page - 1) * pageSize;
   const to = (from + Number(pageSize) ) -1 ;
   
   const { data, error } = await supabase
   .from(businessTable)
   .select(`
      * ,
      Business_owners:business_owner_id(
         business_owner_id,
         personal_informations:personal_info_id(
            *
         )
      )
      
   `)
   .range(from , to);
   
   // console.log("data :",data);
   if(data?.length < 1 || error) {
      res.status(404).json({msg:"something went wrong !"});
   } else {
      res.status(200).json(data);
      return data;
   }
}

export const getStages = async (req, res , next) => {
   const { data, error } = await supabase
   .from(businessStagesTable).select();
   // console.log("stages in server :",data);
   if(data?.length > 0) 
      res.status(200).json(data);
   else 
      res.status(404).json({msg:"something went wrong !"});
}

export const getCommercialTypes = async (req, res , next) => {
   const { data, error } = await supabase
   .from(businessCommercialTypesTable).select();
      // console.log("data commercial :",data);
   if(data?.length > 0) 
      res.status(200).json(data);
   else 
      res.status(404).json({msg:"something went wrong !"});
}

export const getStatuses = async (req, res , next) => {
   const { data, error } = await supabase
   .from(businessStatusesTable).select();
   
   if(data?.length > 0) 
      res.status(200).json(data);
   else 
      res.status(404).json({msg:"something went wrong !"});
}

