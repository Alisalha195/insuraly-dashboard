
import { Flex, Text, VStack } from "@chakra-ui/react";
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
import { AnnualRetirementsTableHeaderData } from "../annual/AnnualRetirementsTableHeaderData.ts";
import AnnualRetirementsTableBody from "../annual/AnnualRetirementsTableBody.tsx";
import { useTranslation } from "react-i18next";

const SearchByName = ({ searchValue }) => {
   // console.log("searchValue in SearchByName :", searchValue)

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
         data:retirementsResultData, 
         error:retirementsResultDataError, 
         isSuccess :retirementsResultDataIsSuccess,
         isLoading :retirementsResultDataIsLoading
   } = usePostCustomQuery(
      ['Retirements-search-results-name', searchValue] ,
      `${host}/retirement/get/name`, 
      {
         firstName: fullName.firstName,
         fatherName: fullName.fatherName,
         motherName: fullName.motherName,
         lastName: fullName.lastName,
      } 
   );
   
   
   // console.log("retirementsResultData in Name Search :",retirementsResultData);

   if(retirementsResultDataIsLoading) {
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
            (retirementsResultData && retirementsResultData.length > 0) ?

            < SearchResults>
               <DataTable
                  TableHeader={
                     
                     <TableHeader headerData={AnnualRetirementsTableHeaderData}  />
                  }
                  TableBody={
                     <AnnualRetirementsTableBody data={retirementsResultData} />
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