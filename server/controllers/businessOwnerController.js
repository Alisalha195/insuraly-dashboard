import {supabase} from "../db/connection.js";
import {businessTable, businessOwnerTable, personalInfoTable } from "../db/tables.js";

export const createBusinessOwner = async (req , res , next) => {
   
     const { personal_info_id } = req.body;

     const { data, error } = await supabase
     .from(businessOwnerTable)
     .insert({ 
         personal_info_id
      })
      .select()
      if(error)
         res.status(404).json({msg:"error occured",  status:404});
      else
         res.status(200).json({...data , status:200})
      
}
export const getBusinessOwner = async (req , res , next) => {
   const {personal_informations} = req.body;

   const { data, error } = await supabase
  .from(businessOwnerTable)
  .select()
  .eq("personal_info_id",  personal_informations.personal_info_id)
  
  if(error) {
   res.status(404).json({msg:"business owner not found !", status:404 });
  } else {
   if(data.length < 1) {
      res.status(400).json({msg:"not a business owner", status:400});
   } else {
      res.status(200).json([
         {...data[0] , personal_informations ,  status:200}
      ]);
      next()
   }
  }
}

export const getBusinessOwnerById = async (req, res, next) => {
   const {id} = req.query;
   
   const { data, error } = await supabase
   .from(businessOwnerTable)
   .select(`
      * ,
      personal_informations:personal_info_id(
         *
      )
   `)
   .eq('business_owner_id', id);
   
   if(error) {
      res.status(404).json({msg:"business owner not found !", status:404 });
   } else {
      if(data.length < 1) {
         res.status(400).json({msg:"not a business owner", status:400});
      } else {
         res.status(200).json({...data[0] , status:200});
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

export const getBusinessOwnersByNames = async (req, res, next) => {
   
   const {firstName, fatherName, motherName,lastName} = req.body;
   
   if(firstName && fatherName && motherName && lastName) {
      const { data, error } = await supabase
      .from(businessOwnerTable)
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
      .from(businessOwnerTable)
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
      .from(businessOwnerTable)
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
      .from(businessOwnerTable)
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

export const getOwnerBusinesses = async (req, res , next) => {
   
   const {ownerId} = req.query;
   
   const { data , error } = await supabase
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
   .eq("business_owner_id",ownerId);
      
   if(data?.length < 1 || error) {
      res.status(404).json({msg:"something went wrong !"});
   } else {
      res.status(200).json(data);
   }
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

