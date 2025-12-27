
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { host } from "../../../../../../../constants/connection.ts";
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";
import SearchResults from "../../search/SearchResults";

import { employeeTableHeaderData } from "../employeeTableHeaderData.ts";
import EmployeeTableBody from "../EmployeeTableBody.tsx";

const SearchByName = ({ searchValue , businessName , businessID}) => {

   const fullName = {
      firstName: "",
      fatherName: "",
      motherName: "",
      lastName: ""
   }
   const { btnGreen, textPrimary } = useThemedColors();

   if (searchValue) {
      const searchList = searchValue.split(" ");

      if (searchList?.length == 1) {
         fullName.firstName = searchList[0];

      } else if (searchList?.length == 2) {
         fullName.firstName = searchList[0];
         fullName.lastName = searchList[1];

      } else if (searchList?.length == 3) {
         fullName.firstName = searchList[0];
         fullName.fatherName = searchList[1];
         fullName.lastName = searchList[2];

      } else if (searchList?.length == 4) {
         fullName.firstName = searchList[0];
         fullName.fatherName = searchList[1];
         fullName.motherName = searchList[2];
         fullName.lastName = searchList[3];
      }
   }

   const { data: employeeResultData,
      error: employeeResultDataError,
      isLoading: employeeResultDataIsLoading,
      isSuccess: employeeResultDataIsSuccess
   } = useQuery({
      queryKey: ['employees-search-results-name', searchValue],
      queryFn: () => fetch(`${host}/employees/get/name/`, {
         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            firstName: fullName.firstName,
            fatherName: fullName.fatherName,
            motherName: fullName.motherName,
            lastName: fullName.lastName,
            businessName: businessName,
            businessID: businessID
         })
      }).then(res => res.json()),
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

export default SearchByName;