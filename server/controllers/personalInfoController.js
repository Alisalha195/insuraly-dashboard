import {supabase} from "../db/connection.js";
import { personalInfoTable } from "../db/tables.js"; 

export const checkIfPersonalInfoRecordExistBeforeCreating =  async(req , res , next) => {
   
   
   const { nationalNumber,
      firstName ,
      lastName ,
      fatherName ,
      motherName ,
      gender ,
      birthDate ,
      birthLocation ,
      registrationLocation ,
      registrationDigit ,
      email,
      phoneNumber
   } = req.body;
   
   console.log("req.body :",req.body);
   
   const { data , error } = await supabase
     .from(personalInfoTable)
     .select('national_number, email, phone_number')
     .or(`national_number.eq.${nationalNumber},email.eq.${email},phone_number.eq.${phoneNumber}`)
     
      if(data?.length > 0) {
         console.log("in check 400")
         res.status(400).json({msg: "Duplicated" , status:400 , duplicatedColumns: duplicatedColumns});
      }
      else if(error) {
         console.log("in check 404")
         res.status(404).json({msg: "error occured" , status:404});
      }
         
      else {
         
         next()
      }

}

export const createPersonalInfoRecord =  async(req , res , next) => {
   
   const { nationalNumber,
      firstName ,
      lastName ,
      fatherName ,
      motherName ,
      gender ,
      birthDate ,
      birthLocation ,
      registrationLocation ,
      registrationDigit ,
      email,
      phoneNumber
   } = req.body;
   
   const { data , error } = await supabase
     .from(personalInfoTable)
     .insert({ 
         national_number: nationalNumber, 
         first_name : firstName ,
         last_name: lastName ,
         father_name: fatherName  ,
         mother_name: motherName ,
         gender : gender ,
         birth_location : birthLocation, 
         birth_date : birthDate ,
         birth_registration_place : registrationLocation ,
         birth_registration_digit: registrationDigit ,
         email: email ,
         phone_number: phoneNumber 
         
      })
      .select()

      if(error)
         res.status(404).json({msg: "error occured" , status:404});
      else {
         req.body.personal_info_id = data[0].personal_info_id;
         next()
      }

}

export const getPersonalInfoByNationalNumber = async (req , res, next) => {

   const {searchValue} = req.body;
   const serachAsNumber = Number(searchValue);

   const {data , error} = await supabase
      .from(personalInfoTable) 
      .select()
      .eq("national_number",serachAsNumber);
      
      if(error || data.length < 1) {
         res.status(404).json({msg:"user not found", status:404});
         
      } else {
         if(data.length > 1) {
            // console.log("data.length > 1 :",data)
            res.status(400).json({msg:"repeated national number !",status:400});
         } else if(data.length == 1) {
            
            req.body.personal_informations = data[0];
            next()
         }
         
      }
}

export const getPersonalInfoByName = async (req , res, next) => {
   // const {firstName,  lastName , motherName, fatherName} = req.body;
   const {firstName, fatherName, motherName,lastName, } = req.body;
   
   const {data , error} = await supabase
      .from(personalInfoTable) 
      .select()
      .like('first_name' , `%${firstName}%`)
      .like('father_name' , `%${fatherName}%`)
      .like('mother_name' , `%${motherName}%`)
      .like('last_name' , `%${lastName}%`)
      
      if(error || data.length < 1) {
         res.status(404).json({msg:"user not found", status:404});
         
      } else {
         if(data.length > 1) {
            console.log("data.length > 1 :",data)
            res.status(400).json({msg:"repeated name !",status:400});
         } else if(data.length == 1) {
            req.body.personal_informations = data[0];
            next()
         }
         
      }
}

export const getPersonalInfoByInsuranceNumber = async(req , res, next) => {
   const {searchValue} = req.body;
   const serachAsNumber = Number(searchValue);
   
   const {data , error} = await supabase
      .from(personalInfoTable) 
      .select()
      .eq("insurance_number",serachAsNumber);
      
      if(error || data.length < 1) {
         res.status(404).json({msg:"user not found", status:404});
         
      } else {
         if(data.length > 1) {
            // console.log("data.length > 1 :",data)
            res.status(400).json({msg:"repeated insurance number !",status:400});
         } else if(data.length == 1) {
            
            req.body.personal_informations = data[0];
            next()
         }
         
      }
}

export const editPersonalInfoRecord = async (req, res, next) => {
   
   const { nationalNumber,
      firstName ,
      lastName ,
      fatherName ,
      motherName ,
      gender ,
      birthDate ,
      birthLocation ,
      registrationLocation ,
      registrationDigit ,
      email,
      phoneNumber,
      
      personalId
   } = req.body;
   
   // console.log("req.body:: ::",req.body);
   
   const { data, error } = await supabase
  .from(personalInfoTable)
  .update({ 
      national_number :nationalNumber,
      first_name:firstName ,
      last_name:lastName ,
      father_name:fatherName ,
      mother_name:motherName ,
      birth_date:birthDate ,
      birth_location:birthLocation ,
      birth_registration_place:registrationLocation ,
      birth_registration_digit:registrationDigit ,
      gender:gender,
      phone_number:phoneNumber ,
      email:email
   })
  .eq('personal_info_id', personalId)
  .select();
  
  if(error) {
   res.status(404).json({msg:"something went wrong" ,  status : 404});
  } else {
     res.status(200).json({msg:"updated successfuly" , status : 200});
  }
  
}

export const deletePersonalInfoRecord = async (req, res , next) => {
   const {personal_info_id} = req.body;
   
   const { data, error } = await supabase
  .from(personalInfoTable)
  .delete()
  .eq('personal_info_id', personal_info_id);
  
  if(error) {
   res.status(404).json({msg:"something went wrong"})
  } else {
     res.status(200).json({msg:"deleted successfuly"})
  }
  
}

export const checkIfPersonalInfoRecordExist =  async(req , res , next) => {
   
   // console.log("req.body :::",req.body);
   
   const { column, value } = req.body;
   
      const { data , error } = await supabase
        .from(personalInfoTable)
        .select(column)
        .eq(column,value)
        
      if(data?.length > 0) {
         // console.log('duplicated!!!!')
         res.status(400).json({msg: "Duplicated" , status:400});
      }
      else if(error) {
         
         res.status(404).json({msg: "error occured" , status:404});
      }
         
      else {

          res.status(200).json({msg: "Not Duplicated" , status:200});
      }

}