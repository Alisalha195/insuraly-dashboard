
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";

import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../../../../constants/connection.ts";

import BusinessTableHeader from "../BusinessTableHeader"
import BusinessTableBody from "../BusinessTableBody"
import SearchResults from "../../search/SearchResults";
import { businessTableHeaderData } from "../businessTableHeaderData.ts"
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";
import { useCustomQuery, usePostCustomQuery } from "../../../../../../../hooks/useCustomQuery.ts";
import TableHeader from "../../../../../../shared/tables/TableHeader.tsx";
import DataTable from "../../../../../../shared/tables/DataTable.tsx";

const SearchByInsuranceNumber = ({ searchValue }) => {
   const { btnGreen, textPrimary } = useThemedColors();
   
   const { 
      data:businessResultData, 
      error:businessResultDataError, 
      isSuccess :businessResultDataIsSuccess,
      isLoading :businessResultDataIsLoading
   } = usePostCustomQuery(
      ['business-search-results-insurance', searchValue] ,
      `${host}/business/get/insurance-number`, 
      { searchValue: searchValue } 
   );
   
   if(businessResultDataIsLoading) {
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
         (businessResultData && businessResultData.length > 0) ?

         < SearchResults>
            <DataTable
               TableHeader={
                  
                  <TableHeader headerData={businessTableHeaderData}  />
               }
               TableBody={
                  <BusinessTableBody data={businessResultData} />
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