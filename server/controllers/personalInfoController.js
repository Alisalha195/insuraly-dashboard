import {supabase} from "../db/connection.js";
import { businessOwnerTable, employeeTable, personalInfoTable } from "../db/tables.js"; 

export const checkIfPersonalInfoRecordExistBeforeCreating =  async(req , res , next) => {
   // console.log("in checkIfPersonalInfoRecordExistBeforeCreating middleware", req.body);
   
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
   
   // console.log("req.body in check p_info :",req.body);
   
   const { data , error } = await supabase
     .from(personalInfoTable)
     .select()
     .eq('first_name',firstName)
     .eq('last_name',lastName)
     .eq('father_name',fatherName)
     .eq('mother_name',motherName)
     .eq('birth_date',birthDate)
     .or(`national_number.eq.${nationalNumber},email.eq.${email},phone_number.eq.${phoneNumber}`)
     
      if(data?.length > 0) {
         console.log("Duplicated personal info record found:");
         res.status(400).json({msg: "Duplicated" , status:400});
      }
      else if(error) {
         // console.log("in check 404")
         res.status(404).json({msg: "error occured" , status:404});
      }
         
      else {
            next();
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
   
   // console.log("serachAsNumber ::",serachAsNumber)
   
   const {data , error} = await supabase
      .from(personalInfoTable) 
      .select()
      .eq("insurance_number",serachAsNumber);
      
      if(error || data.length < 1) {
         res.status(404).json({msg:"user not found", status:404});
         
      } else {
         if(data.length > 1) {
            res.status(400).json({msg:"repeated insurance number !",status:400});
         } else if(data.length == 1) {
            req.body.personal_informations = data[0];
            if(next())
               next();
            else
               res.status(200).json({ status:200, person:data[0]})
            
         }
         
      }
}

export const getPersonalInfoById = async(req , res, next) => {
   const {id} = req.query;
   // const idAsNumber =  Number(id);
   // console.log("req.query :",req.query);
   
   // console.log("serachAsNumber ::",serachAsNumber)
   
   const {data , error} = await supabase
      .from(personalInfoTable) 
      .select()
      .eq("personal_info_id",Number(id));
      
      if(error || data?.length < 1) {
         res.status(404).json({msg:"person not found", status:404});
         
      } else if((data?.length > 0) && (!error)) {
         // console.log("datadata::",data)
         res.status(200).json({ status:200, person:data[0]})
      }
}

export const editPersonalInfoRecord = async (req, res, next) => {
   const {personID} = req.query;
   // console.log("personID in edit ::",personID);
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
  .eq('personal_info_id', Number(personID))
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

export const getPersonRules = async (req, res, next) => {
   const {personId} = req.query;
   // console.log("req.query :",req.query.personId)
   const rules = {};
   
   const {data:personData , error:personDataError} = await supabase
   .from(personalInfoTable)
   .select()
   .eq("personal_info_id", Number(personId));
   
   console.log("personData :",personData);
   
   if(personData?.length > 0 &&  !personDataError) {
      
      const {data:employeeRuleData , error:employeeRuleError} = await supabase
      .from(employeeTable)
      .select("emp_id")
      .eq("personal_info_id", Number(personId));
      
      if((employeeRuleData?.length > 0 ) && (!employeeRuleError)) {
         // rules.push({employee: employeeRuleData[0].emp_id});
         rules.employee = employeeRuleData[0].emp_id ;
      } 
      
      const {data:ownerRuleData , error:ownerRuleError} = await supabase
      .from(businessOwnerTable)
      .select("business_owner_id")
      .eq("personal_info_id", Number(personId));
      
      if((ownerRuleData?.length > 0 ) && (!ownerRuleError)) {
         // rules.push({owner: ownerRuleData[0].business_owner_id});
         rules.owner = ownerRuleData[0].business_owner_id;
      } 
      
      res.status(200).json({ rules : rules, status:200});
   } else {
      res.status(400).json({ rules : null, status:400});
   }
   
}