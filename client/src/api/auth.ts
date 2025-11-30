import { host } from "../constants/connection";

export const logout = async (token) => {
   console.log("log out running in front ");
      const res = await fetch(`${host}/auth/logout`, {
         method: 'POST',
         headers : {
            'Content-Type': 'application/json',
         } , 
         body : JSON.stringify({token})
      });
      const data = await res.json();
      if(data?.status == 200) {
         console.log("logout successfuly :");
         return data.status;
      }
      return 404;
         
   }