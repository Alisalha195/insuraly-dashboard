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
         res.status(404).json({msg: "error occured"});
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
      
      if(error || data.length < 1) {
         res.status(404).json({msg:"user not found"});
      } else {
         if(data.length > 1) {
            res.status(404).json({msg:"repeated national number !"});
         } else {
            req.body.infoData = data[0]
            next()
         }
         
      }
}

export const getPersonalInfoByName = async (req , res, next) => {
   const {firstName,  lastName , motherName, fatherName} = req.body;
   
   const {data , error} = await supabase
      .from(personalInfoTableName) 
      .select()
      .match({
         first_name:firstName, 
         last_name:lastName ,
         mother_name : motherName,
         father_name : fatherName
      })
      
      if(error || data?.length < 1) {
         res.status(404).json({msg:"user not found"})
      } else {
         if(data.length > 1) {      
            res.status(200).json({msg:"repeated name !",data:data, repeated:true})
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
      
      if(error || data.length < 1) {
         res.status(404).json({msg:"user not found !"});
         
      } else {
         if(data.length > 1) {
            res.status(404).json({msg:"repeated insurance number !"});
         } else {
            req.body.infoData = data[0]
            next()
         }
         
      }
}

export const editPersonalInfoRecord = async (req, res, next) => {
   
   const { personal_info_id ,
      national_number,
      first_name ,
      last_name ,
      father_name ,
      mother_name ,
      birth_date ,
      birth_registration_place ,
      birth_registration_digit ,
      
   } = req.body;
   
   const { data, error } = await supabase
  .from(personalInfoTableName)
  .update({ 
      national_number,
      first_name ,
      last_name ,
      father_name ,
      mother_name ,
      birth_date ,
      birth_registration_place ,
      birth_registration_digit ,
   })
  .eq('personal_info_id', personal_info_id)
  .select();
  
  if(error) {
   res.status(404).json({msg:"something went wrong"})
  } else {
     res.status(200).json({msg:"updated successfuly"})
  }
  
}