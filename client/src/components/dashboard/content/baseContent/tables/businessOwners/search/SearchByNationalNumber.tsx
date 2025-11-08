
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../../../../constants/connection.ts";

import BusinessOwnerTableHeader from "../BusinessOwnerTableHeader"
import BusinessOwnerTableBody from "../BusinessOwnerTableBody"
import SearchResults from "../../search/SearchResults";
import { businessOwnerTableHeaderData } from "../businessOwnerTableHeaderData.ts"
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";


const SearchByNationalNumber = ({ searchValue }) => {

   const { btnGreen, textPrimary } = useThemedColors();

   const { data: businessOwnerResultData,
      error: businessOwnerResultDataError,
      isLoading: businessOwnerResultDataIsLoading,
      isSuccess: businessOwnerResultDataIsSuccess
   } = useQuery({
      queryKey: ['business-owners-search-results-national', searchValue],
      queryFn: () => fetch(`${host}/businessOwners/get/national-number`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ searchValue: searchValue }) }).then(res => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

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
            businessOwnerResultData &&

            < SearchResults
               resultData={businessOwnerResultData}
               isSuccess={businessOwnerResultDataIsSuccess}
               headerData={businessOwnerTableHeaderData}
               tableBody={BusinessOwnerTableBody}
            />
         }
      </Flex>
   )
}

export default SearchByNationalNumber