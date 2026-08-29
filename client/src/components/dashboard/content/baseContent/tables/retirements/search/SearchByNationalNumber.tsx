
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../../../../constants/connection.ts";
import SearchResults from "../../search/SearchResults";
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";

import { employeeTableHeaderData } from "../employeeTableHeaderData.ts";
import EmployeeTableBody from "../EmployeeTableBody.tsx";
import { usePostCustomQuery } from "../../../../../../../hooks/useCustomQuery.ts";
import DataTable from "../../../../../../shared/tables/DataTable.tsx";
import TableHeader from "../../../../../../shared/tables/TableHeader.tsx";
import { AnnualRetirementsTableHeaderData } from "../annual/AnnualRetirementsTableHeaderData.ts";
import AnnualRetirementsTableBody from "../annual/AnnualRetirementsTableBody.tsx";
import { useTranslation } from "react-i18next";


const SearchByNationalNumber = ({ searchValue}) => {
   // console.log("searchValue in SearchByNationalNumber :", searchValue)
   const { btnGreen, textPrimary } = useThemedColors();
   const {t} = useTranslation();
   
   const { 
      data:retirementsResultData, 
      error:retirementsResultDataError, 
      isSuccess :retirementsResultDataIsSuccess,
      isLoading :retirementsResultDataIsLoading
   } = usePostCustomQuery(
      ['Retirements-search-results-national', searchValue] ,
      `${host}/retirement/get/national-number`, 
      { searchValue: searchValue} 
   );

   if(retirementsResultDataIsLoading) {
      return (
         <VStack>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
         </VStack>
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

export default SearchByNationalNumber;

