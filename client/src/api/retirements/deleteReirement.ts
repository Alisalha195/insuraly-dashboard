import { host } from "../../constants/connection";


export const deleteRetirement = async (retirementID: number) => {
   try {
      const response = await fetch(`${host}/retirement/delete/?retirementID=${retirementID}`, {   
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });  
      return true 
   } catch(error) {
      console.error("Error deleting retirement:", error);
      return false;
   }
}