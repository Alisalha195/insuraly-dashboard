
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../../../../constants/connection.ts";
import SearchResults from "../../search/SearchResults";
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";

import { employeeTableHeaderData } from "../employeeTableHeaderData.ts";
import EmployeeTableBody from "../EmployeeTableBody.tsx";


const SearchByNationalNumber = ({ searchValue , businessName , businessID }) => {

   const { btnGreen, textPrimary } = useThemedColors();

   
   const { data: employeeResultData,
      error: employeeResultDataError,
      isLoading: employeeResultDataIsLoading,
      isSuccess: employeeResultDataIsSuccess
   } = useQuery({
      queryKey: ['employees-search-results-national', searchValue],
      queryFn: () => fetch(`${host}/employees/get/national-number`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ searchValue: searchValue, businessName: businessName , businessID:businessID }) }).then(res => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

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
            employeeResultData &&

            < SearchResults
               resultData={employeeResultData}
               isSuccess={employeeResultDataIsSuccess}
               headerData={employeeTableHeaderData}
               tableBody={EmployeeTableBody}
            />
         }
      </Flex>
   )
}

export default SearchByNationalNumber