import SearchByInsuranceNumber from "./SearchByInsuranceNumber";
import SearchByName from "./searchByName";
import SearchByNationalNumber from "./SearchByNationalNumber";

export const RetirementsSearchData = [
   {
      tabHeaderTitle:"National number",
      value:"nationalnumber",
      searchContent : SearchByNationalNumber
   },
   {
      tabHeaderTitle:"Person Name",
      value:"name",
      searchContent : SearchByName
   },
   {
      tabHeaderTitle:"Insurance number",
      value:"insurancenumber",
      searchContent : SearchByInsuranceNumber
   },
   
];