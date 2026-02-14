import { host } from "../../constants/connection";
export const getEmployeeByID = async (id) => {
  const employee = await fetch(`${host}/employees/get/id?id=${id}`);

  const employeeData = await employee.json();
  console.log("employeeData in getEmployeeByID : ", employeeData);
  
  if (employeeData?.status == "200") {
    return employeeData;
  } else return null;
};
