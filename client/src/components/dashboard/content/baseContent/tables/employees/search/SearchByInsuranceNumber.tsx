
import { Box, Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../../../../constants/connection.ts";
import SearchResults from "../../search/SearchResults";
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";

import { employeeTableHeaderData } from "../employeeTableHeaderData.ts";
import EmployeeTableBody from "../EmployeeTableBody.tsx";
import { usePostCustomQuery } from "../../../../../../../hooks/useCustomQuery.ts";
import TableHeader from "../../../../../../shared/tables/TableHeader.tsx";
import DataTable from "../../../../../../shared/tables/DataTable.tsx";

const SearchByInsuranceNumber = ({ searchValue , businessName , businessID}) => {
   const { btnGreen, textPrimary, textSecondary } = useThemedColors();
   
   const { 
      data:employeeResultData, 
      error:employeeResultDataError, 
      isSuccess :employeeResultDataIsSuccess,
      isLoading :employeeResultDataIsLoading
   } = usePostCustomQuery(
      ['employees-search-results-insurance', searchValue] ,
      `${host}/employees/get/insurance-number`, 
      { searchValue: searchValue, businessName:businessName, businessID:businessID } 
   );
   
   console.log("employeeResultData :",employeeResultData);
   
   if(employeeResultDataIsLoading) {
      return (
         <VStack>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
         </VStack>
      )
   }
   if(employeeResultData?.length < 1) {
      return (
         <Text color={textSecondary} >No Results Found !</Text>
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
         
         : <Text>No Results Found!</Text>
      }
   </Flex>
   )
}

export default SearchByInsuranceNumber;