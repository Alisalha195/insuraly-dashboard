
import SearchByBusinessInsuranceNumber from "./SearchByBusinessInsuranceNumber";
import SearchByBusinessName from "./SearchByBusinessName";

export const MonthlyClaimsSearchData = [
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