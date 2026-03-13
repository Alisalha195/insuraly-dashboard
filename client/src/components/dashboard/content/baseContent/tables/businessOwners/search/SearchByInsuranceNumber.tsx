
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";

import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../../../../constants/connection.ts";

import BusinessOwnerTableHeader from "../BusinessOwnerTableHeader"
import BusinessOwnerTableBody from "../BusinessOwnerTableBody"
import SearchResults from "../../search/SearchResults";
import { businessOwnerTableHeaderData } from "../businessOwnerTableHeaderData.ts"
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";
import { usePostCustomQuery } from "../../../../../../../hooks/useCustomQuery.ts";
import DataTable from "../../../../../../shared/tables/DataTable.tsx";
import TableHeader from "../../../../../../shared/tables/TableHeader.tsx";

const SearchByInsuranceNumber = ({ searchValue }) => {
   const { btnGreen, textPrimary } = useThemedColors();
   
   const { 
      data:businessOwnerResultData, 
      error:businessOwnerResultDataError, 
      isSuccess :businessOwnerResultDataIsSuccess,
      isLoading :businessOwnerResultDataIsLoading
   } = usePostCustomQuery(
      ['business-owners-search-results-insurance', searchValue] ,
      `${host}/businessOwners/get/insurance-number`, 
      { searchValue: searchValue } 
   );
   
   if(businessOwnerResultDataIsLoading) {
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
         (businessOwnerResultData && businessOwnerResultData.length > 0) ?

         < SearchResults>
            <DataTable
               TableHeader={
                  
                  <TableHeader headerData={businessOwnerTableHeaderData}  />
               }
               TableBody={
                  <BusinessOwnerTableBody data={businessOwnerResultData} />
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