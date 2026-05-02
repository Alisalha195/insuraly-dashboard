import {supabase} from "../db/connection.js";
import { claimsTable  } from "../db/tables.js";

export const getClaimsCount = async (req, res , next) => {
   const { count, error } = await supabase
   .from(claimsTable).select('*', {count : 'exact' , head:true});
      
   if(count > 0) 
      res.status(200).json({count});
   else if(count < 1)
      res.status(200).json({count:0});
   else 
      res.status(404).json({msg:"something went wrong !"});
}

export const getPaginatedMonthlyClaims = async(req, res, next) => {
   const {page, pageSize, month, year} = req.query;
   const from = (page - 1) * pageSize;
   const to = (from + Number(pageSize) ) -1 ;
   
   // console.log("page :",page);
   // console.log("pageSize :",pageSize);
   // console.log("month :",month);
   // console.log("year :",year);
   
   const { data, error } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   .eq('month',month)
   .eq('year',year)
   .range(from , to);
   
   const { count, error:countError } = await supabase
   .from(claimsTable)
   .select("*", { count: "exact", head: true })
   .eq('month',month)
   .eq('year',year);
   
   if(error) {
      res.status(404).json({msg:"something went wrong !"});
   }
   else if(data?.length < 1 ) {
      res.status(200).json({data:[], dataCount:0});
   } else {
      res.status(200).json({data, dataCount:count});
      // return data;
   }
}

export const getPaginatedRetardedClaims = async(req, res, next) => {
   const {page, pageSize} = req.query;
   const from = (page - 1) * pageSize;
   const to = (from + Number(pageSize) ) -1 ;
   const currentDate = new Date(Date.now());
   // console.log("page :",page);
   // console.log("pageSize :",pageSize);
   // console.log("month :",month);
   // console.log("year :",year);
   
   const { data, error } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   // .eq('month',month)
   // .eq('year',year)
   .lt('must_deliver_before', currentDate.toISOString())
   .range(from , to);
   
   // console.log("from  :",from); 
   // console.log("to  :",to);
   // console.log("data  :",data);
   
   const { count, error:countError } = await supabase
   .from(claimsTable)
   .select("*", { count: "exact", head: true })
   // .eq('month',month)
   // .eq('year',year);
   .lt('must_deliver_before', currentDate.toISOString());
   
   if(error) {
      res.status(404).json({msg:"something went wrong !"});
   }
   else if(data?.length < 1 ) {
      res.status(200).json({data:[], dataCount:0});
   } else {
      // console.log("count  :",data.length);
      res.status(200).json({data, dataCount:count});
      // return data;
   }
}

export const getAnnualClaims = async(req, res, next) => {
   const {year} = req.query;
   
   const { data, error } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   .eq('year',year)
   
   const { count, error:countError } = await supabase
   .from(claimsTable)
   .select("*", { count: "exact", head: true })
   .eq('year',year);
   
   if(data?.length < 1 || error) {
      res.status(404).json({msg:"something went wrong !"});
   } else {
      res.status(200).json({data, dataCount:count});
      // return data;
   }
}

export const getRunningClaimsCount = async(req, res, next) => {
   const { count, error } = await supabase
   .from(claimsTable)
   .select('*', {count : 'exact' , head:true});
   // .eq('status', 'running');
   
   if (count > 0) res.status(200).json({ count });
   else if (count < 1) res.status(200).json({ count: 0 });
   else res.status(404).json({ msg: "something went wrong !" });
}

export const getClaimsStats = async (req, res, next) => {
   const {year, month} = req.query;
   console.log("year  :",year);
   console.log("month  :",month);
   
   const currentDate = new Date(Date.now());
   
   const { data:annualStats, error:annualStatsError } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   .eq('year',year);
   
   const { data:monthlyStats, error:monthlyStatsError } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   .eq('month',month-1)
   .eq('year',year);
   
   const { data:retardedStats, error:retardedStatsError } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   // .eq('month',month)
   // .eq('year',year)
   .lt('must_deliver_before', currentDate.toISOString());
   
   if(annualStatsError || monthlyStatsError || retardedStatsError) {
      res.status(404).json({msg:"something went wrong !"});
   }   
   else {
      const annualStatsTotalAmount = annualStats?.reduce((total, claim) => total + claim.amount + claim.fine, 0) || 0;
      const monthlyStatsTotalAmount = monthlyStats?.reduce((total, claim) => total + claim.amount + claim.fine, 0) || 0;
      
      const monthlyStatsDeliveredAmount = monthlyStats?.reduce((total, claim) => claim.delivered && total + claim.amount + claim.fine, 0) || 0;
      
      const retardedStatsTotalAmount = retardedStats?.reduce((total, claim) => total + claim.amount + claim.fine, 0) || 0; 
      
      // console.log("annualStatsTotalAmount  :",annualStatsTotalAmount);
      // console.log("annualStats  :",annualStats); 
      console.log("monthlyStats  :",monthlyStatsTotalAmount); 
      console.log("monthlyStatsDeliveredAmount  :",monthlyStatsDeliveredAmount);
      // console.log("monthlyStats  :",monthlyStats);
      // console.log("retardedStats  :",retardedStats?.length);
      
      res.status(200).json({
         annualStats, 
         monthlyStats, 
         retardedStats, 
         annualStatsCount:annualStats?.length || 0, 
         monthlyStatsCount:monthlyStats?.length || 0, 
         retardedStatsCount:retardedStats?.length || 0,
         annualStatsTotalAmount,
         monthlyStatsTotalAmount : monthlyStatsTotalAmount - monthlyStatsDeliveredAmount,
         monthlyStatsDeliveredAmount,
         retardedStatsTotalAmount
      });
   }
   
   
   
   
}

export const getClaimsByBusinessName = async (req, res, next) => {
   const { searchValue, month } = req.body;
   
   // console.log("searchValue  :",searchValue);
   // console.log("month  :",month);
   
   const { data, error } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   .eq('month',month)
   .like("Service_Subscribtion.Services.Business_Employee.Businesses.business_name", `%${searchValue}%`);
   
   // console.log("results  :",data?.length);
   
   if(error || data?.length < 1) {
      res.status(404).json({msg:"something went wrong !"});
   } else if(searchValue) {
      res.status(200).json({data});
   }
}

export const getClaimsByBusinessInsuranceNumber = async (req, res, next) => {
   
   const { searchValue, month } = req.body;
   
   // console.log("searchValue  :",searchValue);
   // console.log("month  :",month);
   
   const { data, error } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   .eq('month',month)
   .eq("Service_Subscribtion.Services.Business_Employee.Businesses.insurance_number", searchValue);
   
   // console.log("results  :",data?.length);
   
   if(error || data?.length < 1) {
      res.status(404).json({msg:"something went wrong !"});
   } else if(searchValue) {
      res.status(200).json({data});
   }
}

export const getRetardedClaimsByBusinessName = async (req, res, next) => {
   const { searchValue } = req.body;
   const currentDate = new Date(Date.now());
   // console.log("page :",page);
   // console.log("pageSize :",pageSize);
   // console.log("month :",month);
   // console.log("year :",year);
   
   const { data, error } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   // .eq('month',month)
   // .eq('year',year)
   .lt('must_deliver_before', currentDate.toISOString())
   .like("Service_Subscribtion.Services.Business_Employee.Businesses.business_name", `%${searchValue}%`);
   
   // console.log("from  :",from); 
   // console.log("to  :",to);
   // console.log("data  :",data);
   
   const { count, error:countError } = await supabase
   .from(claimsTable)
   .select("*", { count: "exact", head: true })
   // .eq('month',month)
   // .eq('year',year);
   .lt('must_deliver_before', currentDate.toISOString());
   
   if(error) {
      res.status(404).json({msg:"something went wrong !"});
   }
   else if(data?.length < 1 ) {
      res.status(200).json({data:[], dataCount:0});
   } else if(searchValue){
      // console.log("count  :",data.length);
      res.status(200).json({data, dataCount:count});
      // return data;
   }
}

export const getRetardedClaimsByBusinessInsuranceNumber = async (req, res, next) => {
   const { searchValue } = req.body;
   const currentDate = new Date(Date.now());
   // console.log("page :",page);
   // console.log("pageSize :",pageSize);
   // console.log("month :",month);
   // console.log("year :",year);
   
   const { data, error } = await supabase
   .from(claimsTable)
   .select(
      `* , Service_Subscribtion!inner(
         *, Services!inner(
            *, Business_Employee!inner(
                  *, Businesses!inner(
                     *
                  )
               )
            )
         )
      `
   )
   // .eq('month',month)
   // .eq('year',year)
   .lt('must_deliver_before', currentDate.toISOString())
   .eq("Service_Subscribtion.Services.Business_Employee.Businesses.insurance_number", searchValue);
   
   // console.log("from  :",from); 
   // console.log("to  :",to);
   // console.log("data  :",data);
   
   const { count, error:countError } = await supabase
   .from(claimsTable)
   .select("*", { count: "exact", head: true })
   // .eq('month',month)
   // .eq('year',year);
   .lt('must_deliver_before', currentDate.toISOString());
   
   if(error) {
      res.status(404).json({msg:"something went wrong !"});
   }
   else if(data?.length < 1 ) {
      res.status(200).json({data:[], dataCount:0});
   } else {
      // console.log("count  :",data.length);
      res.status(200).json({data, dataCount:count});
      // return data;
   }
}
   