import SearchByInsuranceNumber from "./SearchByInsranceNumber";
import SearchByName from "./SearchByName";

export const BusinessSearchData = [
   {
      tabHeaderTitle:"name",
      value:"name",
      searchContent : SearchByName
   },
   {
      tabHeaderTitle:"insuranceNumber",
      value:"insurancenumber",
      searchContent : SearchByInsuranceNumber
   },
   
];