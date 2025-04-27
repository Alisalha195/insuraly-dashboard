import {supabase} from "../db/connection.js";

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
     .from('personal_informations')
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