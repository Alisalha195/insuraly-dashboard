
import { Flex,  Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import BusinessTableHeader from "../BusinessTableHeader"
import useThemedColors from "../../../../../../../../hooks/useThemedColors";
import { usePostCustomQuery } from "../../../../../../../../hooks/useCustomQuery";
import { host } from "../../../../../../../../constants/connection";
import SkeletonLoader from "../../../../../../../shared/Skeleton";
import SearchResults from "../../../search/SearchResults";
import DataTable from "../../../../../../../shared/tables/DataTable";
import TableHeader from "../../../../../../../shared/tables/TableHeader";
import RetardedClaimsTableBody from "../RetardedClaimsTableBody";
import { retardedClaimsTableHeaderData } from "../retardedClaimsTableHeaderData";


const SearchByBusinessName = ({ searchValue, month }) => {

   const { btnGreen, textPrimary } = useThemedColors();
      
      const date = new Date();
      const thisMonth = date.getMonth();
      // console.log("this month is :", thisMonth);
      const { 
         data:claimsResultData, 
         error:claimsResultDataError, 
         isSuccess :claimsResultDataIsSuccess,
         isLoading :claimsResultDataIsLoading
      } = usePostCustomQuery(
         ['retarded-claims-search-results-business-name', searchValue, month] ,
         `${host}/claims/retarded/get/buisness-name`, 
         { searchValue: searchValue, month: month ? month : thisMonth  } 
      );
   
   if(claimsResultDataIsLoading) {
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
         (claimsResultData && claimsResultData?.data?.length > 0) ?

         < SearchResults>
            <DataTable
               TableHeader={
                  
                  <TableHeader headerData={retardedClaimsTableHeaderData}  />
               }
               TableBody={
                  <RetardedClaimsTableBody data={claimsResultData.data} />
               }
               maxHeight={"300px"}
            />
         </SearchResults>
         
         : <Text>No Results Found!</Text>
      }
      </Flex>
   )
}

export default SearchByBusinessName;