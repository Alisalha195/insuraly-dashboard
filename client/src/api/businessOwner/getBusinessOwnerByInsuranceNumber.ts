
export const  getBusinessOwnerByInsuranceNumber = async (value) => {
   
   const bowner = await fetch("http://localhost:5000/businessOwners/get/insurance-number",{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify({searchValue:value})});
   
   const bownerData = await bowner.json();

   
   
   if(bownerData[0]?.status == '200') {
      return bownerData[0];
   }else 
      return null
}
