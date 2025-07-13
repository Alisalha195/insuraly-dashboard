
export const  getBusinessOwnerByInsuranceNumber = async (value) => {
   
   const bowner = await fetch("http://localhost:5000/businessOwners/get/insurance-number",{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify({insuranceNumber:value})});
   
   const bownerData = await bowner.json();

   if(bownerData.status == '200')
      return bownerData;
   else 
      return null
}
