import {supabase} from "../db/connection.js";
import { servicesWagesTable } from "../db/tables.js";

export const addServiceWages = async (req , res , next) => {
   const { 
      service_id , 
      initiate_start_date ,
      initiate_registration_number ,
      is_initiative ,
      salary
   } = req.body;
   
   const {data , error} = await supabase
   .from(servicesWagesTable)
   .insert({
      service_id: service_id ,
      service_wage_date : initiate_start_date,
      wage_registration_number : initiate_registration_number ,
      wage_amount : salary ,
      is_initiative : is_initiative
   })
   .select();
   
   if((data.length > 0) && (!error)) {
      res.status(200).json({msg : "service added successfuly !"});
   } else {
      res.status(404).json({msg : "something went wrong !"});
   }
   
}

export const updateServiceWages = async (req , res , next) => {
   const {serviceID , wages} = req.body;
   // console.log("serviceID and wages in saveWages controller :", serviceID , wages);
}

export const saveServiceWages = async (req , res , next) => {
   const {serviceID , wages} = req.body;

   // console.log("wages in saveWages controller :" , wages);
   
   const wagesInFormat = wages.map(wage => ({
      service_id: serviceID,
      service_wage_date: wage.wageDate,
      wage_registration_number: wage.wage_registration_number || 1,
      wage_registration_date: wage.wage_registration_date || new Date().toISOString(),
      wage_amount: wage.wageAmount,
      // is_initiative: wage.is_initiative
      
   }));
   // console.log("wages in format to insert/update :" , wagesInFormat);
   const {data: previuosWages , error:previuosWagesError} = await supabase
   .from(servicesWagesTable)
   .select()
   .eq("service_id" , Number(serviceID));
   
   // console.log("previuosWages :",previuosWages)
   // console.log("wagesToInsert :",wagesToInsert)
   
   const wagesToInsert = [...wagesInFormat];
   const wagesToUpdate = [];
   const idsToKeep = [];
   
   if(previuosWages?.length > 0 ) {  // update existing wages
      
      wagesInFormat.forEach( (wageInFormat, index) => {
         previuosWages.forEach( (previousWage, prevIndex) => {
            // console.log("wage date :", new Date(wage?.service_wage_date));
            // console.log("previous wage date :", new Date(previousWage?.service_wage_date));
            
            
            if(new Date(wageInFormat?.service_wage_date).getFullYear() == new Date( previousWage?.service_wage_date).getFullYear()  ) 
               if(new Date(wageInFormat?.service_wage_date).getMonth()+1 == new Date(previousWage?.service_wage_date).getMonth()+1)
                  if(new Date(wageInFormat?.service_wage_date).getDate() == new Date(previousWage?.service_wage_date).getDate()) {
                     
                     wagesToInsert[index].alreadyExists = true; 
                     
                     idsToKeep.push(previousWage.service_wage_id);
                     
                     wagesToUpdate.push({
                        service_wage_id: previousWage.service_wage_id,
                        service_id: wageInFormat.service_id || previousWage.service_id,
                        service_wage_date: wageInFormat.service_wage_date || previousWage.service_wage_date,
                        wage_registration_number: wageInFormat.wage_registration_number || previousWage.wage_registration_number,
                        wage_registration_date: wageInFormat.wage_registration_date || previousWage.wage_rewage_registration_date || new Date().toISOString(),
                        wage_amount: wageInFormat.wage_amount
                     })
                     
                  }
            
         });
      });
      
      // const idsToKeepList = `(${idsToKeep.join(',')})`;
      
      const {data:deletedWages , error:deletedWagesError} = await supabase
      .from(servicesWagesTable)
      .delete()
      .eq("service_id" , Number(serviceID))
      .not("service_wage_id" , "in" , `(${idsToKeep.join(',')})`);
      
      if(deletedWagesError) {
         res.status(400).json({msg : "something went wrong!", status:400});
         return;
      }
      
      const {data:updatedWages , error:updatedWagesError} = await supabase
      .from(servicesWagesTable)
      .upsert(wagesToUpdate)
      .select();
      
      const wagesToActuallyInsert = wagesToInsert.filter(wage => !wage.alreadyExists);
      
      const {data:insertedWages , error:insertedWagesError} = await supabase
      .from(servicesWagesTable)
      .insert(wagesToActuallyInsert)
      .select(); 
      
      let savingWages = false;
      
      if(wagesToUpdate.length > 0) {
         if((updatedWages.length > 0) && (!updatedWagesError)) {
            if(wagesToActuallyInsert.length > 0) {
               if((insertedWages.length > 0) && (!insertedWagesError)) {
                  savingWages = true;
               } else {
                  savingWages = false;
               }
            } else {
               savingWages = true;
            }
            
         } else {
            savingWages = false;
         }
      } else {
         if(wagesToActuallyInsert.length > 0) {
            if((insertedWages.length > 0) && (!insertedWagesError)) {
               savingWages = true;
            } else {
               savingWages = false;
            }
         } else {
            savingWages = false;
         }
      }
      
      if(savingWages) {
         console.log("wages inserted/updated successfully !");
         res.status(200).json({msg : "service wages saved successfuly !", status:200});
      } else {
         res.status(400).json({msg : "something went wrong while inserting wages !", status:400});
      }
      
   } else { // insert for first time
      
      
      const {data:insertedWages , error:insertedWagesError} = await supabase
      .from(servicesWagesTable)
      .insert(wagesInFormat)
      .select();  
      
      if((insertedWages.length > 0) && (!insertedWagesError)) {
         console.log("wages inserted successfully !");
         res.status(200).json({msg : "service wages saved successfuly !", status:200});
      } else {
         res.status(400).json({msg : "something went wrong while inserting wages !", status:400});
      }
      
   }
   
   // console.log("wages to insert :", wagesToInsert);
   // console.log("wages to update :", wagesToUpdate);
}



// export const saveServiceWages = async (req , res , next) => {
//    const {serviceID , wages} = req.body;
   
//    const wagesInFormat = wages.map(wage => ({
//       service_id: serviceID,
//       service_wage_date: wage.wageDate,
//       wage_registration_number: wage.wage_registration_number || 1,
//       wage_registration_date: wage.wage_registration_date || new Date().toISOString(),
//       wage_amount: wage.wageAmount,
//       // is_initiative: wage.is_initiative
      
//    }));

//    const {data: previuosWages , error:previuosWagesError} = await supabase
//    .from(servicesWagesTable)
//    .select()
//    .eq("service_id" , Number(serviceID));
   
//    if(previuosWages?.length > 0 ) {
//       const {data:deletedWages , error:deletedWagesError} = await supabase
//       .from(servicesWagesTable)
//       .delete()
//       .eq("service_id" , Number(serviceID));
      
//       if(!deletedWagesError) {
//          const {data:insertedWages , error:insertedWagesError} = await supabase
//          .from(servicesWagesTable)
//          .insert(wagesInFormat)
//          .select();
//       }
//    }
   
   

// }

export const getWagesByServiceID = async (req , res , next) => {
   const {serviceID} = req.query;
   
   const {data , error} = await supabase
   .from(servicesWagesTable)
   .select()
   .eq("service_id" , Number(serviceID));
   
   // console.log("wages by serviceID :" , data);
   
   if((data.length > 0) && (!error)) {
      res.status(200).json({msg : "service wages fetched successfuly !", wages :data});
   } else {
      res.status(404).json({msg : "something went wrong !"});
   }
}