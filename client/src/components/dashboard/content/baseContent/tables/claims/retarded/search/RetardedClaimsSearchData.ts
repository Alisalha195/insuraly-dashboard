
import SearchByBusinessInsuranceNumber from "./SearchByBusinessInsuranceNumber";
import SearchByBusinessName from "./SearchByBusinessName";

export const RetardedClaimsSearchData = [
   {
      tabHeaderTitle:"businessName",
      value:"name",
      searchContent : SearchByBusinessName
   },
   {
      tabHeaderTitle:"businessInsuranceNumber",
      value:"insurancenumber",
      searchContent : SearchByBusinessInsuranceNumber
   },
   
];