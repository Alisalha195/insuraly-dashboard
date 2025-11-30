
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { host } from "../../../../../../../constants/connection.ts";

import BusinessTableHeader from "../BusinessTableHeader"
import BusinessTableBody from "../BusinessTableBody"
import SearchResults from "../../search/SearchResults";
import { businessTableHeaderData } from "../businessTableHeaderData.ts"
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";

const SearchByName = ({ searchValue }) => {

   const { btnGreen, textPrimary } = useThemedColors();

   const { data: businessResultData,
      error: businessResultDataError,
      isLoading: businessResultDataIsLoading,
      isSuccess: businessResultDataIsSuccess
   } = useQuery({
      queryKey: ['business-search-results-name', searchValue],
      queryFn: () => fetch(`${host}/business/get/name/`, {
         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({searchValue: searchValue})
      }).then(res => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

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
            businessResultData &&

            < SearchResults
               resultData={businessResultData}
               isSuccess={businessResultDataIsSuccess}
               headerData={businessTableHeaderData}
               tableBody={BusinessTableBody}
            />
         }
      </Flex>
   )
}

export default SearchByName;