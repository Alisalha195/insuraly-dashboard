import { host } from "../constants/connection";
import { supabase } from "../lib/supabaseClient";

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
         
         const {error} =  await supabase.auth.signOut(token);
         return data.status;
      }
      return 404;
         
   }