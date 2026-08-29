
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
import { useTranslation } from "react-i18next";


const SearchByNationalNumber = ({ searchValue , businessName , businessID }) => {

   const { btnGreen, textPrimary } = useThemedColors();
    const {t} = useTranslation();
   const { 
      data:employeeResultData, 
      error:employeeResultDataError, 
      isSuccess :employeeResultDataIsSuccess,
      isLoading :employeeResultDataIsLoading
   } = usePostCustomQuery(
      ['employees-search-results-national', searchValue] ,
      `${host}/employees/get/national-number`, 
      { searchValue: searchValue, businessName: businessName , businessID:businessID } 
   );

   if(employeeResultDataIsLoading) {
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
            (employeeResultData && employeeResultData.length > 0) ?

            < SearchResults>
               <DataTable
                  TableHeader={
                     
                     <TableHeader headerData={employeeTableHeaderData}  />
                  }
                  TableBody={
                     <EmployeeTableBody data={employeeResultData} />
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

