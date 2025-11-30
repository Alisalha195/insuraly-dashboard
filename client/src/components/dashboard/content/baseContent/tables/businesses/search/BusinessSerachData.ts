import SearchByInsuranceNumber from "./SearchByInsranceNumber";
import SearchByName from "./SearchByName";

export const BusinessSearchData = [
   {
      tabHeaderTitle:"Name",
      value:"name",
      searchContent : SearchByName
   },
   {
      tabHeaderTitle:"Insurance number",
      value:"insurancenumber",
      searchContent : SearchByInsuranceNumber
   },
   
];