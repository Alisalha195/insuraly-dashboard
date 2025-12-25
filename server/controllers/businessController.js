import { supabase } from "../db/connection.js";
import {
  businessTable,
  businessEmployeeTable,
  businessStagesTable,
  businessCommercialTypesTable,
  businessStatusesTable,
  employeeTable,
} from "../db/tables.js";

export const createBusiness = async (req, res, next) => {
  const {
    businessOwnerId,
    businessName,
    city,
    country,
    commercialType,
    lawInitiativeDate,
    stage,
    status,
  } = req.body;
  // console.log("req.body :",req.body);

  const { data, error } = await supabase
    .from(businessTable)
    .insert({
      business_owner_id: businessOwnerId,
      business_name: businessName,
      registration_date: new Date(Date.now()),
      registration_number: 1,
      stage: stage,
      status: status,
      state: city,
      country: country,
      commercial_type: commercialType,
      law_initiative_date: lawInitiativeDate,
    })
    .select();
  console.log("data :", data);
  if (error || data?.length < 1)
    res.status(400).json({ msg: "error occured", status: 400 });
  else res.status(200).json({ ...data, status: 200 });
};

export const editBusiness = async (req, res, next) => {
  const {
    business_id,
    business_owner_id,
    business_name,
    registration_date,
    registration_number,
    financial_balance,
    is_self_insurance,
  } = req.body;

  const { data, error } = await supabase
    .from(businessTable)
    .update({
      business_owner_id,
      business_name,
      registration_date,
      registration_number,
      financial_balance,
      is_self_insurance,
    })
    .eq("business_id", business_id)
    .select();

  if (error) res.status(400).send("error occured");
  else res.status(200).json(data);
};

export const getBusinessById = async (req, res, next) => {
   const { id } = req.query;
   // console.log("businessId :",id);
   
   const { data, error } = await supabase
     .from(businessTable)
     .select(`
        * ,
        Business_owners:business_owner_id( * ,
           personal_informations:personal_info_id(
               *
      )
        )
     `)
     .eq("business_id", id);
     
      // console.log("business by id data :",data[0]?.Business_owners?.personal_informations);
      
      if(data.length < 1 || error) {
        res.status(404).json({msg:"not found", status:404});
      } else {
        res.status(200).json({...data[0] , status:200});
        next()
      }
        
}

export const addEmployeeToBusiness = async (req, res, next) => {
  const { businessID, employeeID } = req.body;
  const businessIDAsNumber = Number(businessID);
   //   console.log("businessIDAsNumber :", businessIDAsNumber);
   //   console.log("employeeID :", employeeID);
  
  const {data:b_e, error:b_e_error} = await supabase
  .from(businessEmployeeTable)
  .select()
  .eq("business_id", businessIDAsNumber)
  .eq("employee_id", employeeID);
  
   //   check if already this resord exist
  if(b_e?.length > 0 && !b_e_error)  {
       console.log("employee already in business !");
         req.body.business_employee_id = b_e[0].business_employee_id;
         next();
         return;
  } else {
   
     const { data:businessEmployeeID, error } = await supabase
       .from(businessEmployeeTable)
       .insert({
         business_id: businessIDAsNumber,
         employee_id: employeeID,
       })
       .select("business_employee_id")
       .single();
     
     if (businessEmployeeID && !error) {
       console.log("inserted Success !");
       req.body.business_employee_id = businessEmployeeID?.business_employee_id;
       req.params.businessID = businessIDAsNumber;
       next();
       return;
     } else {
         console.log("inserted faild !");
         res.status(404).json({ msg: "something went wrong...!" });
         return;
     }
  }
  

};

export const setBusinessEmployeesCount = async (req, res, next) => {
   const businessEmployeesCount =  req.params.businessEmployeesCount;
   
   console.log("req.body :",req.body)
   const {data, error} = await supabase  
   .from(businessTable)
   .update({
      employees_count : Number(businessEmployeesCount)
   })
   .select()
   .eq("business_id", Number(req.body.businessID));
   // employees_count: supabase.raw('employees_count + 1')
   console.log("setBusinessEmployeesCount data :",data);
   
   if(!error) {
      next()
   }
   
}

export const removeEmployeeFromBusiness = async (req, res, next) => {
  const { employeeId, businessID } = req.body;
  
   //   console.log("removeEmployeeFromBusiness req.body :", req.body);
  const businessIDAsNumber = Number(businessID);
  
  const { data, error } = await supabase
    .from(businessEmployeeTable)
    .delete()
    .select()
    .eq("employee_id", employeeId)
    .eq("business_id", businessIDAsNumber);

  if (data?.length > 0 && !error) {
    res
      .status(200)
      .json({ msg: "employee removed from business successfuly  !", status: 200 });
  } else {
    res.status(404).json({ msg: "something went wrong  !" });
  }
};

export const getAllEmployeesInBusiness = async (req, res, next) => {
  const { businessId } = req.body;
   
  const { data , error } = await supabase
   .from(businessEmployeeTable)
   .select(`
      employee_id,
      Employees:employee_id(
         personal_informations:personal_info_id(
            *
         )
      )`
   )
   .eq("business_id",businessId);
   
   if (data?.length < 1 || error) {
      res.status(404).json({ msg: "something went wrong !" });
    } else {
      res.status(200).json(data);
      return data;
    }
   
};

export const getPaginatedEmployeesInBusiness = async (req, res, next) => {
  const { page, pageSize,  businessId} = req.query;
  const from = (page - 1) * pageSize;
  const to = from + Number(pageSize) - 1;
  
  const { data , error } = await supabase
  .from(businessEmployeeTable)
  .select(`
     employee_id,
     Employees:employee_id(
        personal_informations:personal_info_id(
           *
        )
     )`
  )
  .eq("business_id",businessId)
   .range(from, to);
  
  
  if (data?.length < 1 || error) {
     res.status(404).json({ msg: "something went wrong !" });
   } else {
     res.status(200).json(data);
     return data;
   }
  
};

export const getBusinessesCount = async (req, res, next) => {
  const { count, error } = await supabase
    .from(businessTable)
    .select("*", { count: "exact", head: true });

  if (count > 0) res.status(200).json({ count });
  else if (count < 1) res.status(200).json({ count: 0 });
  else res.status(404).json({ msg: "something went wrong !" });
};

export const getBusinessEmployeesCountMiddleware = async (req, res, next) => {
   const {businessID} = req.params;
   // console.log("businessId :",businessID);
   const { data, error } = await supabase
     .from(businessEmployeeTable)
     .select()
      .eq("business_id", Number(businessID));
      
   if (data?.length > 0) {
      // console.log("empolyee count is : ",data?.length)
      req.params.businessEmployeesCount = data?.length;
      next();
   }
   else {
      // console.log("no employees")
      res.status(404).json({ msg: "something went wrong !" ,status:404});
   }
   
   
};

export const getBusinessEmployeesCount = async (req, res, next) => {
   const {businessID} = req.params;
   // console.log("businessId :",businessID);
   const { data, error } = await supabase
     .from(businessEmployeeTable)
     .select()
      .eq("business_id", Number(businessID));
      
   if (data?.length > 0) {
      // console.log("empolyee count is : ",data?.length)
      req.params.businessEmployeesCount = data?.length;
      res.status(200).json({count:data?.length, status:200});
      next();
   }
   else {
      // console.log("no employees")
      res.status(404).json({ msg: "something went wrong !" ,status:404});
   }
   
   
};

export const getPaginatedBusinesses = async (req, res, next) => {
  const { page, pageSize } = req.query;
  const from = (page - 1) * pageSize;
  const to = from + Number(pageSize) - 1;

  const { data, error } = await supabase
    .from(businessTable)
    .select(
      `
      * ,
      Business_owners:business_owner_id(
         business_owner_id,
         personal_informations:personal_info_id(
            *
         )
      )
      
   `
    )
    .range(from, to);

  // console.log("data :",data);
  if (data?.length < 1 || error) {
    res.status(404).json({ msg: "something went wrong !" });
  } else {
    res.status(200).json(data);
    return data;
  }
};

export const getStages = async (req, res, next) => {
  const { data, error } = await supabase.from(businessStagesTable).select();
  // console.log("stages in server :",data);
  if (data?.length > 0) res.status(200).json(data);
  else res.status(404).json({ msg: "something went wrong !" });
};

export const getCommercialTypes = async (req, res, next) => {
  const { data, error } = await supabase
    .from(businessCommercialTypesTable)
    .select();
  // console.log("data commercial :",data);
  if (data?.length > 0) res.status(200).json(data);
  else res.status(404).json({ msg: "something went wrong !" });
};

export const getStatuses = async (req, res, next) => {
  const { data, error } = await supabase.from(businessStatusesTable).select();

  if (data?.length > 0) res.status(200).json(data);
  else res.status(404).json({ msg: "something went wrong !" });
};

export const getBusinessByInsuranceNumber = async (req, res, next) => {
  const { searchValue } = req.body;
  const { data, error } = await supabase
    .from(businessTable)
    .select(
      `
      * ,
      Business_owners:business_owner_id(
         business_owner_id,
         personal_informations:personal_info_id(
            *
         )
      )
      
   `
    )
    .eq("insurance_number", searchValue);

  if (data?.length > 0) res.status(200).json(data);
  else res.status(404).json({ msg: "something went wrong !", status: 404 });
};

export const getBusinessByName = async (req, res, next) => {
  const { searchValue } = req.body;
  const { data, error } = await supabase
    .from(businessTable)
    .select(
      `
      * ,
      Business_owners:business_owner_id(
         business_owner_id,
         personal_informations:personal_info_id(
            *
         )
      )
   `
    )
    .like("business_name", `%${searchValue}%`);

  if (data?.length > 0) res.status(200).json(data);
  else res.status(404).json({ msg: "something went wrong !", status: 404 });
};
