
import SearchByBusinessInsuranceNumber from "./SearchByBusinessInsuranceNumber";
import SearchByBusinessName from "./SearchByBusinessName";

export const RetardedClaimsSearchData = [
   {
      tabHeaderTitle:"Business Name",
      value:"name",
      searchContent : SearchByBusinessName
   },
   {
      tabHeaderTitle:"Business Insurance number",
      value:"insurancenumber",
      searchContent : SearchByBusinessInsuranceNumber
   },
   
];