import { useQuery } from "@tanstack/react-query";
import { host } from "../constants/connection";
import { useAuthPostCustomQuery } from "../hooks/useCustomQuery";


export const isAdmin = () => {
   
   const userEmail = "";
   const { 
         data:adminData, 
         error:adminDataDataError, 
         isSuccess :adminDataDataIsSuccess,
         isLoading :adminDataDataIsLoading
      } = useAuthPostCustomQuery(
         ["is-admin" ,userEmail] ,
        `${host}/admin/is-admin`, 
        { email: userEmail || "" }
        
      );
      
      console.log("adminData ::", adminData)
      
      if (adminData?.status == 200) 
         return adminData?.isAdmin ;
      
      return false;
}
