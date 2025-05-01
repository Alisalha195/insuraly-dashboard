import {supabase} from "../db/connection.js";
const businessOwnerTableName = 'Business_owners';

export const createBusinessOwner = async (req , res , next) => {
   
     const { personal_info_id } = req.body;

     const { error } = await supabase
     .from(businessOwnerTableName)
     .insert({ 
         personal_info_id
      })
      if(error)
         res.status(400).send("error occured");
      else
         res.status(200).send("business owner created successfully")
      
}
export const getBusinessOwner = async (req , res , next) => {
   const {infoData} = req.body;
   const { data, error } = await supabase
  .from(businessOwnerTableName)
  .select()
  .eq("personal_info_id",  infoData.personal_info_id)
  
  if(error) {
   throw new Error("business owner not found !");
  } else {
   if(data.length < 1) {
      res.status(200).send("not a business owner");
   } else {
      res.status(200).json({...data[0], ...infoData})
   }
  }
}
// export const editBusinessOwner = async (req , res , next) => {
   
// }
// export const deleteBusinessOwner = async (req , res , next) => {
   
// }
