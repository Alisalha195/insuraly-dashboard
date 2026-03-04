import { host } from "../../constants/connection";
export const getPersonalInfoByInsuranceNumber = async (value) => {
  const person = await fetch(`${host}/personalInformations/get/insurance-number`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ searchValue: value }),
  });

  const personData = await person.json();
//   console.log("person Data :", personData);
  
  if (personData?.status == "200") {
    return personData?.person;
  } else return null;
};
