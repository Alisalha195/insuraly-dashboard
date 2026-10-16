// import { useAuthPostCustomQuery } from './yourQueryHookPath'; // Adjust this import path

import { useEffect, useState } from "react";
import { host } from "../constants/connection";
import { fetchPosthWithAuth, fetchWithAuth, useAuthPostCustomQuery } from "./useCustomQuery";

// export const useIsAdmin2 =  () => {
   
//    const userEmail  = "";
//   const { 
//     data: adminData, 
//     isLoading,
//     error 
//   } = useAuthPostCustomQuery(
//     ["is-admin", userEmail],
//     `${host}/admin/is-admin`, 
//     { email: userEmail || "" },
//   );
//   console.log("adminData ::", adminData)
//   const isAdminFlag = adminData?.status === 200 ? adminData?.isAdmin : false;

//   return { 
//     isAdmin: isAdminFlag, 
//     isLoading 
//   };
// };

export const useIsAdmin = (userEmail) => {
   const { 
     data: adminData, 
     isLoading,
     error 
   } = useAuthPostCustomQuery(
     ["is-admin", userEmail],
     `${host}/admin/is-admin`, 
     { email: userEmail || "" },
     { enabled: !!userEmail } 
   );
 
   const isAdminFlag = adminData?.status === 200 ? adminData?.isAdmin : false;
 
   return { 
     isAdmin: isAdminFlag, 
     isLoading: !!userEmail && isLoading 
   };
 };
