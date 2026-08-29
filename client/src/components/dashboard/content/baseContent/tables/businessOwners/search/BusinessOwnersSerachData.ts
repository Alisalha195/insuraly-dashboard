import SearchByInsuranceNumber from "./SearchByInsuranceNumber";
import SearchByName from "./searchByName";
import SearchByNationalNumber from "./SearchByNationalNumber";

export const BusinessOwnersSearchData = [
   {
      tabHeaderTitle:"nationalNumber",
      value:"nationalnumber",
      searchContent : SearchByNationalNumber
   },
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