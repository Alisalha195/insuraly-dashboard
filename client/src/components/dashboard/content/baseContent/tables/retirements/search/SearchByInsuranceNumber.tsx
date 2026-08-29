
import { Flex, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { host } from "../../../../../../../constants/connection.ts";
import SearchResults from "../../search/SearchResults";
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";

import { usePostCustomQuery } from "../../../../../../../hooks/useCustomQuery.ts";
import TableHeader from "../../../../../../shared/tables/TableHeader.tsx";
import DataTable from "../../../../../../shared/tables/DataTable.tsx";
import { AnnualRetirementsTableHeaderData } from "../annual/AnnualRetirementsTableHeaderData.ts";
import AnnualRetirementsTableBody from "../annual/AnnualRetirementsTableBody.tsx";
import { useTranslation } from "react-i18next";

const SearchByInsuranceNumber = ({ searchValue }) => {
   // console.log("searchValue in SearchByInsuranceNumber :", searchValue)
   const { btnGreen, textPrimary, textSecondary } = useThemedColors();
   const {t} = useTranslation();
   
   const { 
      data:retirementsResultData, 
      error:retirementsResultDataError, 
      isSuccess :retirementsResultDataIsSuccess,
      isLoading :retirementsResultDataIsLoading
   } = usePostCustomQuery(
      ['Retirements-search-results-insurance', searchValue] ,
      `${host}/retirement/get/insurance-number`, 
      { searchValue: searchValue} 
   );
   
   // console.log("retirementsResultData :",retirementsResultData);
   
   if(retirementsResultDataIsLoading) {
      return (
         <VStack>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
         </VStack>
      )
   }
   if(retirementsResultData?.length < 1) {
      return (
         <Text color={textSecondary} >No Results Found !</Text>
      )
   }
   return (
      
      <Flex>
      {
         (retirementsResultData && retirementsResultData.length > 0) ?

         < SearchResults>
            <DataTable
               TableHeader={
                  
                  <TableHeader headerData={AnnualRetirementsTableHeaderData}  />
               }
               TableBody={
                  <AnnualRetirementsTableBody data={retirementsResultData} />
               }
               maxHeight={"560px"}
            />
         </SearchResults>
         
         : <Text>{t("NoResultsFound")}</Text>
      }
   </Flex>
   )
}

export default SearchByInsuranceNumber;