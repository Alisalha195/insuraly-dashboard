
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { host } from "../../../../../../../constants/connection.ts";
import SkeletonLoader from "../../../../../../shared/Skeleton.tsx";
import SearchResults from "../../search/SearchResults";

import { employeeTableHeaderData } from "../employeeTableHeaderData.ts";
import EmployeeTableBody from "../EmployeeTableBody.tsx";
import { usePostCustomQuery } from "../../../../../../../hooks/useCustomQuery.ts";
import TableHeader from "../../../../../../shared/tables/TableHeader.tsx";
import DataTable from "../../../../../../shared/tables/DataTable.tsx";
import { useTranslation } from "react-i18next";

const SearchByName = ({ searchValue , businessName , businessID}) => {

   const fullName = {
      firstName: "",
      fatherName: "",
      motherName: "",
      lastName: ""
   }
   const { btnGreen, textPrimary } = useThemedColors();
    const {t} = useTranslation();
    
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

   const { 
      data:employeeResultData, 
      error:employeeResultDataError, 
      isSuccess :employeeResultDataIsSuccess,
      isLoading :employeeResultDataIsLoading
   } = usePostCustomQuery(
      ['employees-search-results-name', searchValue] ,
      `${host}/employees/get/name/`, 
      {
         firstName: fullName.firstName,
         fatherName: fullName.fatherName,
         motherName: fullName.motherName,
         lastName: fullName.lastName,
         businessName: businessName,
         businessID: businessID
      } 
   );
   
   console.log("employeeResultData in Name Search :",employeeResultData);

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

export default SearchByName;