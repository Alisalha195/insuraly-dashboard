
export const  checkPersonExist = async (column, value) => {
   
   const status = await fetch("http://localhost:5000/personalInformations/checkIfExist",{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify({column:column , value:value})}).then(res => res.status);
   
   // console.log("status :",status)
   
   if(status == 400)
      return false;
   else 
      return true ;
}