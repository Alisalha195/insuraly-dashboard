
import { Button, CloseButton, Dialog, Flex, Portal, Text, VStack } from "@chakra-ui/react";
// import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import useThemedColors from "../../../../../../../../hooks/useThemedColors";
import { useAuthPostCustomQuery } from "../../../../../../../../hooks/useCustomQuery";
import { host } from "../../../../../../../../constants/connection";
import SkeletonLoader from "../../../../../../../shared/Skeleton";
import SearchResults from "../../../search/SearchResults";
import DataTable from "../../../../../../../shared/tables/DataTable";
import TableHeader from "../../../../../../../shared/tables/TableHeader";
import  LogsTableHeaderData  from "../LogsTableHeaderData";
import LogsTableBody from "../LogsTableBody";

const SearchByEmail = ({ searchValue }) => {

   // const fullName = {
   //    firstName: "",
   //    fatherName: "",
   //    motherName: "",
   //    lastName: ""
   // }
   const { btnGreen, textPrimary } = useThemedColors();
   const {t} = useTranslation();
      
   const { 
      data:logsResultData, 
      error:logsResultDataError, 
      isSuccess :logsResultDataIsSuccess,
      isLoading :logsResultDataIsLoading
   } = useAuthPostCustomQuery(
      ['user-logs-search-results-email', searchValue] ,
     `${host}/admin/audit-logs/user-email`, 
     { searchValue: searchValue}
   );
   
   console.log("logsResultData :: ",logsResultData);

   if(logsResultDataIsLoading) {
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
         (logsResultData?.data && logsResultData?.data?.length > 0) ?

         < SearchResults>
            <DataTable
               TableHeader={
                  
                  <TableHeader headerData={logsTableHeaderData}  />
               }
               TableBody={
                  <LogsTableBody data={logsResultData?.data} />
               }
               maxHeight={"350px"}
               maxWidth ={"100%"}
            />
         </SearchResults>
         
         : <Text>{t("NoResultsFound")}</Text>
      }
      </Flex>
   )
}

export default SearchByEmail;