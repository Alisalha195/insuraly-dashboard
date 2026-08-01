import {supabase} from "../db/connection.js";
import { retirementSalaryTable, retirementTable } from "../db/tables.js";

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
   
   const {retirementID} = req.body;
   
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