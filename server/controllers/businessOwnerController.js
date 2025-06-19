import {supabase} from "../db/connection.js";
import { businessOwnerTable, personalInfoTable } from "../db/tables.js";

export const createBusinessOwner = async (req , res , next) => {
   
     const { personal_info_id } = req.body;

     const { data, error } = await supabase
     .from(businessOwnerTable)
     .insert({ 
         personal_info_id
      })
      .select()
      if(error)
         res.status(404).json({msg:"error occured"});
      else
         res.status(200).json(data)
      
}
export const getBusinessOwner = async (req , res , next) => {
   const {infoData} = req.body;
   const { data, error } = await supabase
  .from(businessOwnerTable)
  .select()
  .eq("personal_info_id",  infoData.personal_info_id)
  
  if(error) {
   res.status(404).json({msg:"business owner not found !"});
  } else {
   if(data.length < 1) {
      res.status(404).json({msg:"not a business owner"});
   } else {
      res.status(200).json({...data[0], ...infoData})
      next()
   }
  }
}

export const getPaginatedBusinessOwners = async (req, res, next) => {
   const {page, pageSize} = req.query;
   const from = (page - 1) * pageSize;
   const to = (from + Number(pageSize) ) -1 ;
   
   const { data, error } = await supabase
   .from(businessOwnerTable)
   .select(`
      * ,
      personal_informations:personal_info_id(
         *
      )
   `)
   .range(from , to);
   
   if(data?.length < 1 || error) {
      res.status(404).json({msg:"something went wrong !"});
   } else {
      res.status(200).json(data);
      return data;
   }
}

export const getBusinessOwnersCount = async (req, res , next) => {
   const { count, error } = await supabase
   .from(businessOwnerTable).select('*', {count : 'exact' , head:true});
   
   if(count > 0) 
      res.status(200).json({count});
   else if(count < 1)
      res.status(200).json({count:0});
   else 
      res.status(404).json({msg:"something went wrong !"});
}

export const deleteBusinessOwner = async (req, res , next) => {
   const {businessOwnerId} = req.body;
   
   const { data, error } = await supabase
  .from(businessOwnerTable)
  .delete()
  .eq('business_owner_id', businessOwnerId);
  
  if(error) {
   res.status(404).json({msg:"something went wrong"})
  } else {
     res.status(200).json({msg:"deleted successfuly"})
  }
}

