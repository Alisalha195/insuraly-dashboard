import { host } from "../../constants/connection";
export const getEmployeeByInsuranceNumber = async (value) => {
  const employee = await fetch(`${host}/employees/get/insurance-number`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ searchValue: value }),
  });

  const employeeData = await employee.json();
  console.log("employeeData :", employeeData);
  
  if (employeeData?.status == "200") {
    return employeeData;
  } else return null;
};

export const getEmployeeToRetireByInsuranceNumber = async (value) => {
   const employee = await fetch(`${host}/employees/get/insurance-number/forRetirement`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ searchValue: value }),
   });
 
   const employeeData = await employee.json();
   // console.log("employeeData :", employeeData?.data?.status);
   
   if (employeeData?.data?.status == "200") {
      
     return employeeData?.data;
   } else return null;
 };

// 
