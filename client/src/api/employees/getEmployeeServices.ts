import { host } from "../../constants/connection";

export const  getEmployeeServices = async ( personID , businessID = 0 ) => {
   
   const services = await fetch(`${host}/employees/servicesByPersonID?personID=${personID}`);
   const servicesData = await services.json();
   
   console.log("services in getEmployeeServices : ", servicesData.data);
   
   if(businessID && servicesData?.status == "200") {
      const servicesAtBusiness = servicesData.data.filter(service => service?.Business_Employee?.business_id == businessID);
      
      console.log("services after filter : ", servicesAtBusiness);
      return {services:servicesAtBusiness, success:true};
      
   } else if(!businessID && servicesData?.status == "200") {
      return {services:servicesData.data, success:true};
   } 
   return null;
    
}
// "employees/services?employeeID="