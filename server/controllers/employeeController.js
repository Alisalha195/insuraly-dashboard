import {supabase} from "../db/connection.js";
import { businessEmployeeTable, employeeTable, servicesTable } from "../db/tables.js";

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
  
     console.log("data in get employee :",data);
  if(error) {
   res.status(404).json({msg: "Employee not found !"});
  } else {
   if(data.length < 1) {
      res.status(200).json({msg: "not an employee"});
   } else {
      res.status(200).json({data:{...data[0], ...personal_informations, status:200}})
      next()
   }
  }
}

export const getEmployeeByID = async (req , res , next) => {
   const {id} = req.query;
      
      const { data, error } = await supabase
      .from(employeeTable)
      .select(`
         * ,
         personal_informations:personal_info_id(
            *
         )
      `)
      .eq('emp_id', id);
      
      if(error) {
         res.status(404).json({msg:"employee not found !", status:404 });
      } else {
         if(data.length < 1) {
            res.status(400).json({msg:"not an employee", status:400});
         } else {
            res.status(200).json({...data[0] , status:200});
            next()
         }
      }
}

export const getEmployeeServicesByPersonID = async (req, res, next) => {
   const {personID} = req.query;
   const personIDAsNumber = Number(personID);
   // console.log("personID in getEmployeeServicesByPersonID :",personIDAsNumber);
   const { data, error } = await supabase
   .from(servicesTable)
   .select(`
      *,
      Business_Employee!inner(
         *,
         Employees!inner(
            *,
            personal_informations!inner(
               *
            )
         ),
         Businesses!inner(
            *
         )
      )
   `)
   .eq("Business_Employee.Employees.personal_informations.personal_info_id", personIDAsNumber);

   if (data?.length < 1 || error) {
      // console.log("services not found!! ");
      res.status(404).json({ msg: "something went wrong !" , status:404});
    } else {

      res.status(200).json({data, status:200});
      return data;
    }
}

export const getEmployeeServices = async (req , res , next) => {
   const {employeeID} = req.query;
   const employeeIDAsNumber = Number(employeeID);
   // console.log("employeeID in getEmployeeServices :",employeeIDAsNumber);
   
   const { data , error } = await supabase
   .from(servicesTable)
   .select(`
      *,
      Business_Employee:business_employee_id(
         
         *,
         Employees:employee_id(
            *
         ),
         Businesses:business_id(
            *
         )
      )`
   )
   .eq("Business_Employee.employee_id",employeeIDAsNumber)
   .not("Business_Employee", "is", null);
   
   
   // console.log("data in getEmployeeServices :",data);
   
   if (data?.length < 1 || error) {
      console.log("services not found!! ");
      res.status(404).json({ msg: "something went wrong !" });
    } else {
      // const filteredData = data.filter(item => item.Business_Employee !== null);
      // console.log("services :",filteredData);
      res.status(200).json(data);
      return data;
    }
}

export const checkIfEmployee = async (req ,res , next) => {
   const {personID} = req.body ;
   // console.log("req.body :",req.body);
   
   const {data , error } = await supabase
   .from(employeeTable)
   .select("emp_id")
   .eq("personal_info_id" , Number(personID));
   
   if((data?.length > 0) && (!error)) {
      req.body.employeeID = data[0].emp_id;
      next();
   }
   else if((data?.length < 1) && (!error)) {
      req.body.employeeID = 0;
      next();
   }
   else {
      res.status(404).json({msg:"something went wrong", status:404});
      return;
   }
}

export const getEmployeeByNames = async (req , res , next) => {
    const {firstName, fatherName, motherName,lastName} = req.body;
   //  console.log("reqqq name :",req.body);
      
      if(firstName && fatherName && motherName && lastName) {
         const { data, error } = await supabase
         .from(employeeTable)
         .select(`
            * ,
            personal_informations!inner(
               *
            )
         `)
         .like('personal_informations.first_name' , `%${firstName}%`)
         .like('personal_informations.father_name' , `%${fatherName}%`)
         .like('personal_informations.mother_name' , `%${motherName}%`)
         .like('personal_informations.last_name' , `%${lastName}%`)
         
         if(data?.length < 1 || error) {
            res.status(404).json({msg:"something went wrong !",status:404});
         } else {
            res.status(200).json(data);
            return data;
         }
      } else if(firstName && fatherName &&  lastName ) {
         const { data, error } = await supabase
         .from(employeeTable)
         .select(`
            * ,
            personal_informations!inner(
               *
            )
         `)
         .like('personal_informations.first_name' , `%${firstName}%`)
         .like('personal_informations.father_name' , `%${fatherName}%`)
         .like('personal_informations.last_name' , `%${lastName}%`)
         
         if(data?.length < 1 || error) {
            res.status(404).json({msg:"something went wrong !",status:404});
         } else {
            res.status(200).json(data);
            return data;
         }
      } else if(firstName  &&  lastName ) {
         const { data, error } = await supabase
         .from(employeeTable)
         .select(`
            * ,
            personal_informations!inner(
               *
            )
         `)
         .like('personal_informations.first_name' , `%${firstName}%`)
         .like('personal_informations.last_name' , `%${lastName}%`)
         
         if(data?.length < 1 || error) {
            res.status(404).json({msg:"something went wrong !",status:404});
         } else {
            res.status(200).json(data);
            return data;
         }
      } else if(firstName ) {
         const { data, error } = await supabase
         .from(employeeTable)
         .select(`
            * ,
            personal_informations!inner(
               *
            )
         `)
         .like('personal_informations.first_name' , `%${firstName}%`)
         
         if(data?.length < 1 || error) {
            res.status(404).json({msg:"something went wrong !",status:404});
         } else {
            res.status(200).json(data);
            return data;
         }
      } else {
         res.status(404).json({msg:"something went wrong !",status:404});
      }
      
}

export const getEmployeeByNamesInBusiness = async (req , res , next) => {
   const {firstName, fatherName, motherName,lastName, businessID, businessName} = req.body;
   const business_id = Number(businessID);

     if(firstName && fatherName && motherName && lastName) {
      const { data, error } = await supabase
      .from(businessEmployeeTable)
      .select(`
          employee_id,
          Employees!inner(
             personal_informations!inner(
                *
             )
          )`
       )
       .eq('business_id', business_id)
        .like('Employees.personal_informations.first_name' , `%${firstName}%`)
        .like('Employees.personal_informations.father_name' , `%${fatherName}%`)
        .like('Employees.personal_informations.mother_name' , `%${motherName}%`)
        .like('Employees.personal_informations.last_name' , `%${lastName}%`)
        
        if(data?.length < 1 || error) {
         res.status(404).json({msg:"something went wrong !",status:404});
         console.log("data for names : error!!")
         } else {
             const filteredData = data.filter(item => item.Employees.personal_informations !== null);

             const result = [
                filteredData, 
                {businessID:businessID} , 
                {businessName:businessName}
             ];
             
             res.status(200).json(result);
         }
     } else if(firstName && fatherName &&  lastName ) {
      const { data, error } = await supabase
      .from(businessEmployeeTable)
      .select(`
          employee_id,
          Employees!inner(
             personal_informations!inner(
                *
             )
          )`
       )
       .eq('business_id', business_id)
        .like('Employees.personal_informations.first_name' , `%${firstName}%`)
        .like('Employees.personal_informations.father_name' , `%${fatherName}%`)
        .like('Employees.personal_informations.last_name' , `%${lastName}%`)
        
        if(data?.length < 1 || error) {
         res.status(404).json({msg:"something went wrong !",status:404});
         console.log("data for names : error!!")
         } else {
             const filteredData = data.filter(item => item.Employees.personal_informations !== null);

             const result = [
                filteredData, 
                {businessID:businessID} , 
                {businessName:businessName}
             ];
             
             res.status(200).json(result);
         }
     } else if(firstName  &&  lastName ) {
         const { data, error } = await supabase
         .from(businessEmployeeTable)
         .select(`
             employee_id,
             Employees!inner(
                personal_informations!inner(
                   *
                )
             )`
          )
          .eq('business_id', business_id)
        .like('Employees.personal_informations.first_name' , `%${firstName}%`)
        .like('Employees.personal_informations.last_name' , `%${lastName}%`)
        
        if(data?.length < 1 || error) {
            res.status(404).json({msg:"something went wrong !",status:404});
            console.log("data for names : error!!")
         } else {
             const filteredData = data.filter(item => item.Employees.personal_informations !== null);

             const result = [
                filteredData, 
                {businessID:businessID} , 
                {businessName:businessName}
             ];
             
             res.status(200).json(result);
         }
     } else if(firstName ) {
        const { data, error } = await supabase
        .from(businessEmployeeTable)
        .select(`
            employee_id,
            Employees!inner(
               personal_informations!inner(
                  *
               )
            )`
         )
         .eq('business_id', business_id)
         .like('Employees.personal_informations.first_name' , `%${firstName}%`)
        
        if(data?.length < 1 || error) {
           res.status(404).json({msg:"something went wrong !",status:404});
           console.log("data for names : error!!")
        } else {
            const filteredData = data.filter(item => item.Employees.personal_informations !== null);

            const result = [
               filteredData, 
               {businessID:businessID} , 
               {businessName:businessName}
            ];
            
            res.status(200).json(result);
        }
     } else {
        res.status(404).json({msg:"something went wrong !",status:404});
     }
}
export const getEmployeeInBusiness = async (req, res , next) => {
   
   const {personal_informations, businessID, businessName} = req.body;
   const business_id = Number(businessID);
   
   const { data:employeeData, error:employeeError } = await supabase
   .from(employeeTable)
   .select()
   .eq("personal_info_id",  personal_informations.personal_info_id);
   
   if(employeeError || employeeData.length < 1) {
      res.status(404).json({msg: "Employee not found !", status:404});
     } else {
      
         const {data:businessEmployeeData , error:businessEmployeeError} = await supabase
         .from(businessEmployeeTable)
         .select()
         .eq("business_id", business_id)
         .eq('employee_id', employeeData[0].emp_id);
         
         if(businessEmployeeData.length > 0 && !businessEmployeeError) {
            
            
            const result = [
               [
                  {
                     employee_id : employeeData[0].emp_id ,
                     Employees : {personal_informations : {
                        ...personal_informations
                      }
                     }
                     
                  } 
               ], 
               {businessID:businessID} , 
               {businessName:businessName}
            ];
            
            res.status(200).json(result);
            
         } else {
            res.status(404).json({msg: "Employee not found !", status:404});
         }
      }
     }

   

