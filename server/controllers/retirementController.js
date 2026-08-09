import {supabase} from "../db/connection.js";
import { retirementSalaryReceiptCenter, retirementSalaryTable, retirementTable, retirementFamilyFileTable , retirementAccumulationsTable, retirementIndemnificationTable } from "../db/tables.js";


export const createRetirement = async (req, res , next) => {
   const { employeeID, reason} = req.body;
   // console.log("employeeID :", employeeID);
   // console.log("reason :", reason);
   console.log("req.body :", req.body);
   
    const { data, error } = await supabase
       .from(retirementTable)
       .insert({
         employee_id: Number(employeeID),
         reason : reason
       })
       .select();
       
     console.log("data :", data[0]);
     if (error || data?.length < 1)
       res.status(400).json({ msg: "error occured", status: 400 });
     else res.status(200).json({ ...data[0], status: 200 });
}

export const getRetirementCount = async (req, res , next) => {
   const { count, error } = await supabase
   .from(retirementTable).select('*', {count : 'exact' , head:true});
      
   if(count > 0) 
      res.status(200).json({count});
   else if(count < 1)
      res.status(200).json({count:0});
   else 
      res.status(404).json({msg:"something went wrong !"});
}

export const getPaginatedAnnualRetirements = async(req, res, next) => {
  const { page, pageSize ,type, year} = req.query;
  const from = (page - 1) * pageSize;
  const to = from + Number(pageSize) - 1;
   
   // const year = "2025";
   
   if(type != "age" && type != "death") {
      const { data ,count ,error } = await supabase
      .from(retirementSalaryTable)
      .select(
         `* , Retirement!inner (
            *, Employees!inner (
               *,personal_informations!inner(
                  *
                ), Business_Employee!inner(
                  * , Services!inner (
                     *
                     ) 
                  ) 
               )
            )
         `,
         { count: "exact"}
       )
      .lte('initiate_date',year+"-12-31")
      .gte('initiate_date',year+"-01-01")
      // .not('Retirement.Employees.Business_Employee.Services.finish_date', 'is', null)
      .neq('Retirement.reason', "age")
      .neq('Retirement.reason', "death")
      .range(Number(from), Number(to));
      
      if(data?.length < 1 || error) {
         res.status(404).json({msg:"something went wrong !"});
      } else {
         res.status(200).json({data, dataCount:count});
         // return data;
      }
      
   } else {
      const { data ,count ,error } = await supabase
      .from(retirementSalaryTable)
      .select(
         `* , Retirement!inner (
            *, Employees!inner (
               *,personal_informations!inner(
                  *
                ), Business_Employee!inner(
                  * , Services!inner (
                     *
                     ) 
                  ) 
               )
            )
         `,
      { count: "exact"}
      )
      .lte('initiate_date',year+"-12-31")
      .gte('initiate_date',year+"-01-01")
      // .not('Retirement.Employees.Business_Employee.Services.finish_date', 'is', null)
      .eq('Retirement.reason', type)
      .range(Number(from), Number(to));
      
      if(data?.length < 1 || error) {
         res.status(404).json({msg:"something went wrong !"});
      } else {
         res.status(200).json({data, dataCount:count});
         // return data;
      }
   }
  
      
      // .order('Retirement.Employees.Business_Employee.Services.finish_date', { ascending: false }) // Newest date first
      // .limit(1) // Fetch only one row
      // .single();
   // .eq('year',year)
   
   // console.log("year",year);
   
   // const { count, error:countError } = await supabase
   // .from(retirementTable)
   // .select("*", { count: "exact", head: true })
   // .eq('year',year);
   
}

export const getPaginatedMonthlyRetirements = async(req, res, next) => {
   const { page, pageSize ,type, month, year} = req.query;
   const from = (page - 1) * pageSize;
   const to = from + Number(pageSize) - 1;
       
   //  const year = "2025";
    
    if(type != "age" && type != "death") {
      const { data, count ,error } = await supabase
      .from(retirementSalaryTable)
      .select(
       `* , Retirement!inner (
          *, Employees!inner (
             *,personal_informations!inner(
                *
              ), Business_Employee!inner(
                * , Services!inner (
                   *
                   ) 
                ) 
             )
          )
       `,
       { count: "exact"}
      )
      .lte('initiate_date',year+"-" + month +"-31")
      .gte('initiate_date',year+"-" + month +"-01")
       // .not('Retirement.Employees.Business_Employee.Services.finish_date', 'is', null)
      .neq('Retirement.reason', "age")
      .neq('Retirement.reason', "death")
      .range(Number(from), Number(to));
      
      if(data?.length < 1 || error) {
         res.status(404).json({msg:"something went wrong !"});
      } else {
         res.status(200).json({data, dataCount:count});
         // return data;
      }
    } else {
      const { data, count ,error } = await supabase
      .from(retirementSalaryTable)
      .select(
       `* , Retirement!inner (
          *, Employees!inner (
             *,personal_informations!inner(
                *
              ), Business_Employee!inner(
                * , Services!inner (
                   *
                   ) 
                ) 
             )
          )
       `,
       { count: "exact"}
      )
      .lte('initiate_date',year+"-" + month +"-31")
      .gte('initiate_date',year+"-" + month +"-01")
       // .not('Retirement.Employees.Business_Employee.Services.finish_date', 'is', null)
      .eq('Retirement.reason', type)
      .range(Number(from), Number(to));
      
      if(data?.length < 1 || error) {
         res.status(404).json({msg:"something went wrong !"});
      } else {
         res.status(200).json({data, dataCount:count});
         // return data;
      }
    }

       // .order('Retirement.Employees.Business_Employee.Services.finish_date', { ascending: false }) // Newest date first
       // .limit(1) // Fetch only one row
       // .single();
    // .eq('year',year)
    
    
   //  const { count, error:countError } = await supabase
   //  .from(retirementTable)
   //  .select("*", { count: "exact", head: true })
   //  .eq('year',year);
    
    
}

export const getMonthlyRetirementCount = async (req, res , next) => {
   const { month, type, year } = req.query;
   // const year = "2025";

   if(type != "age" && type != "death") {
      const { count, error } = await supabase
      .from(retirementSalaryTable)
      .select(
         `* , Retirement!inner (
            *, Employees!inner (
               *,personal_informations!inner(
                  *
                ), Business_Employee!inner(
                  * , Services!inner (
                     *
                     ) 
                  ) 
               )
            )
         `,
      { count: "exact"}
      )
      .lte('initiate_date',year+"-" + month +"-31")
      .gte('initiate_date',year+"-" + month +"-01")
      .neq('Retirement.reason', "age")
      .neq('Retirement.reason', "death");
      
      if (count > 0) res.status(200).json({ count });
      else if (count < 1) res.status(200).json({ count: 0 });
      else res.status(404).json({ msg: "something went wrong !" });
      
   } else {
      const { count, error } = await supabase
      .from(retirementSalaryTable)
      .select(
         `* , Retirement!inner (
            *, Employees!inner (
               *,personal_informations!inner(
                  *
                ), Business_Employee!inner(
                  * , Services!inner (
                     *
                     ) 
                  ) 
               )
            )
         `,
      { count: "exact"}
      )
      .lte('initiate_date',year+"-" + month +"-31")
      .gte('initiate_date',year+"-" + month +"-01")
      .eq('Retirement.reason', type);
      
      
      if (count > 0) res.status(200).json({ count });
      else if (count < 1) res.status(200).json({ count: 0 });
      else res.status(404).json({ msg: "something went wrong !" });
   }     
   
   
}

export const getAnnualRetirementCount = async (req, res , next) => {
   const {type, year} = req.query;
   // const year = "2025";

   
   if(type != "age" && type != "death") {
      const { count, error } = await supabase
      .from(retirementSalaryTable)
      .select(
         `* , Retirement!inner (
            *, Employees!inner (
               *,personal_informations!inner(
                  *
                ), Business_Employee!inner(
                  * , Services!inner (
                     *
                     ) 
                  ) 
               )
            )
         `,
      { count: "exact"}
      )
      .lte('initiate_date',year+"-12-31")
      .gte('initiate_date',year+"-01-01")
      .neq('Retirement.reason', "age")
      .neq('Retirement.reason', "death");
      
      if (count > 0) res.status(200).json({ count });
      else if (count < 1) res.status(200).json({ count: 0 });
      else res.status(404).json({ msg: "something went wrong !" });
      
   } else {
      const { count ,error } = await supabase
      .from(retirementSalaryTable)
      .select(
         `* , Retirement!inner (
            *, Employees!inner (
               *,personal_informations!inner(
                  *
                ), Business_Employee!inner(
                  * , Services!inner (
                     *
                     ) 
                  ) 
               )
            )
         `,
      { count: "exact"}
      )
      .lte('initiate_date',year+"-12-31")
      .gte('initiate_date',year+"-01-01")
      // .not('Retirement.Employees.Business_Employee.Services.finish_date', 'is', null)
      .eq('Retirement.reason', type);
      
      if (count > 0) res.status(200).json({ count });
      else if (count < 1) res.status(200).json({ count: 0 });
      else res.status(404).json({ msg: "something went wrong !" });
   }     
   
   
   
}

export const deleteRetirement = async (req, res , next) => {
   
   const {retirementID} = req.query;
   
   const { data, error } = await supabase
  .from(retirementTable)
  .delete()
  .eq('retirement_id', retirementID);
  
  if(error) {
   res.status(404).json({msg:"something went wrong"})
  } else {
     res.status(200).json({msg:"deleted successfuly"})
  }
}

export const getSalaryReceiptCenters = async (req, res , next) => {
   
   const { data:receiptCenters , error:receiptCentersError } = await supabase
   .from(retirementSalaryReceiptCenter)
   .select();
   
   // console.log("data in reasons :",reasons);
   if(receiptCenters?.length > 0 && !receiptCentersError)
      res.status(200).json({data:receiptCenters, status:200});
   else
      res.status(400).json({msg:"no receipt centers found", status:400});
}

export const createRetirementExtending = async (req, res , next) => {
   console.log("extendings req.body :", req.body);
   
   const { salary, salaryReceiptCenter, salaryInitiateDate, accumulations, indemnification, wifeShare , childrenShare, retirementID} = req.body;
   
   const expireDate = new Date(salaryInitiateDate);
   expireDate.setFullYear(expireDate.getFullYear() + 3);
   
   const { data, error } = await supabase
   .from(retirementSalaryTable)
   .insert({
      retirement_id: Number(retirementID),
      salary_amount: Number(salary),
      receipt_center_number: salaryReceiptCenter,
      initiate_date: salaryInitiateDate,
      activation_expire_date: expireDate,
   }).select();
   
   // console.log("data in createRetirementExtending :", data, count);
   if(error || data[0]?.length < 1) {
      res.status(400).json({msg:"something went wrong !", status:400});
   } else {
      const { data, error } = await supabase
      .from(retirementAccumulationsTable)
      .insert({
         amount: Number(accumulations),
         retirement_id: Number(retirementID),
      }).select();
      
      
      if(error || data[0]?.length < 1) {
         res.status(400).json({msg:"something went wrong !", status:400});
      } else {
         const { data,count , error } = await supabase
         .from(retirementIndemnificationTable)
         .insert({
            amount: Number(indemnification),
            retirement_id: Number(retirementID),
         }).select();
         
         if(error ||  data[0]?.length < 1) {
            res.status(400).json({msg:"something went wrong !", status:400});
         } else {
            const { data,count , error } = await supabase
            .from(retirementFamilyFileTable)
            .insert({
               retirement_id: Number(retirementID),
               wife_share: Number(wifeShare),
               children_share: Number(childrenShare),
            }).select();
            
            if(error ||  data[0]?.length < 1) {
               res.status(400).json({msg:"something went wrong !", status:400});
            } else {
               res.status(200).json({msg:"retirement extending created successfuly", status:200});
            }
         }
      }
   }
}