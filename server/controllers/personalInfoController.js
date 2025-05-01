import {supabase} from "../db/connection.js";

const personalInfoTableName = 'personal_informations';

export const createPersonalInfoRecord =  async(req , res , next) => {
   
   const { national_number,
       first_name ,
       last_name ,
       father_name ,
       mother_name ,
       birth_date ,
       birth_registration_place ,
       birth_registration_digit ,
       insurance_number
   } = req.body;
   
   const { data , error } = await supabase
     .from(personalInfoTableName)
     .insert({ 
         national_number, 
         first_name ,
         last_name ,
         father_name ,
         mother_name ,
         birth_date ,
         birth_registration_place ,
         birth_registration_digit ,
         insurance_number
      })
      .select()

      if(error)
         res.status(400).send("error occured");
      else {
         req.body.personal_info_id = data[0].personal_info_id;
         next()
      }

}

export const getPersonalInfoByNationalNumber = async (req , res, next) => {
   const {nationalNumber} = req.body;
   
   const {data , error} = await supabase
      .from(personalInfoTableName) 
      .select()
      .eq("national_number",nationalNumber);
      
      if(error) {
         throw new Error("user not found !");
      } else {
         if(data.length > 1) {
            throw new Error("repeated national number !");
         } else {
            req.body.infoData = data[0]
            next()
         }
         
      }
}

export const getPersonalInfoByName = async (req , res, next) => {
   const {firstName,  lastName} = req.body;
   
   const {data , error} = await supabase
      .from(personalInfoTableName) 
      .select()
      .match({first_name:firstName, last_name:lastName})
      
      if(error) {
         throw new Error("user not found !");
      } else {
         if(data.length > 1) {      
            throw new Error("repeated name !");
         } else {
            req.body.infoData = data[0]
            next()
         }
         
      }
}

export const getPersonalInfoByInsuranceNumber = async(req , res, next) => {
   const {insuranceNumber} = req.body;
   
   const {data , error} = await supabase
      .from(personalInfoTableName) 
      .select()
      .eq("insurance_number",insuranceNumber);
      
      if(error) {
         throw new Error("user not found !");
      } else {
         if(data.length > 1) {
            throw new Error("repeated insurance number !");
         } else {
            req.body.infoData = data[0]
            next()
         }
         
      }
}