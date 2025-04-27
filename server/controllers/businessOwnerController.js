import {supabase} from "../db/connection.js";

export const createBusinessOwner = async (req , res , next) => {
   
     const { personal_info_id } = req.body;

   //   console.log("req.body" , req.body);
     
     const { error } = await supabase
     .from('Business_owners')
     .insert({ 
         personal_info_id
      })
      if(error)
         res.status(400).send("error occured");
      else
         res.status(200).send("business owner created successfully")
      
}
export const getBusinessOwner = async (req , res , next) => {
   
}
export const editBusinessOwner = async (req , res , next) => {
   
}
export const deleteBusinessOwner = async (req , res , next) => {
   
}
