import { host } from "../../constants/connection";
export const getPersonalInfoByInsuranceNumber = async (value) => {
  const person = await fetch(`${host}/personalInformations/get/insurance-number`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ searchValue: value }),
  });

  const personData = await person.json();
  
  if (personData?.status == "200") {
    return personData;
  } else return null;
};
