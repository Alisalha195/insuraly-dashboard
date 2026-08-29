import SearchByInsuranceNumber from "./SearchByInsuranceNumber";
import SearchByName from "./searchByName";
import SearchByNationalNumber from "./SearchByNationalNumber";

export const RetirementsSearchData = [
   {
      tabHeaderTitle:"nationalNumber",
      value:"nationalnumber",
      searchContent : SearchByNationalNumber
   },
   {
      tabHeaderTitle:"personName",
      value:"name",
      searchContent : SearchByName
   },
   {
      tabHeaderTitle:"insuranceNumber",
      value:"insurancenumber",
      searchContent : SearchByInsuranceNumber
   },
   
];