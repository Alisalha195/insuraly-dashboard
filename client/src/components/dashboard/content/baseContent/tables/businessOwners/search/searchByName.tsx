
import { Button, CloseButton, Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { host } from "../../../../../../../constants/connection.ts";

import BusinessOwnerTableHeader from "../BusinessOwnerTableHeader"
import BusinessOwnerTableBody from "../BusinessOwnerTableBody"
import SearchResults from "../../search/SearchResults";
import { businessOwnerTableHeaderData } from "../businessOwnerTableHeaderData.ts"

const SearchByName = ({ searchValue }) => {

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

   const { data: businessOwnerResultData,
      error: businessOwnerResultDataError,
      isLoading: businessOwnerResultDataIsLoading,
   } = useQuery({
      queryKey: ['business-owners-search-results-name', searchValue],
      queryFn: () => fetch(`${host}/businessOwners/get/name/`, {
         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            firstName: fullName.firstName,
            fatherName: fullName.fatherName,
            motherName: fullName.motherName,
            lastName: fullName.lastName,
         })
      }).then(res => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

   return (
      <Flex justifyContent={'center'}>
         <Dialog.Root size="full" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild >
               <Button disabled={businessOwnerResultDataIsLoading} className='btn' backgroundColor={btnGreen} paddingX={{ xssToXmm: "5px", xmmTo2xl: "6px" }} borderRadius={6} paddingY={1} height={'auto'} lineHeight={1} color={textPrimary} marginBottom={{ xssToXmm: "7px" }} fontSize={{ xssToXm: "15px", xmToSm: "16px" }}>
                  name
               </Button>
            </Dialog.Trigger>
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content>
                     <Dialog.Header>
                        <Dialog.Title>
                           <Text fontSize={{ xssToXm: "16px", xmToSm: "18px" }}>
                              search by name for :
                           </Text>
                           <Text textAlign={'center'}>
                              {searchValue}
                           </Text>
                        </Dialog.Title>
                     </Dialog.Header>
                     <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                     </Dialog.CloseTrigger>
                     <Dialog.Body  >
                        {

                           businessOwnerResultData &&
                           <Flex justifyContent={"center"}>
                              < SearchResults
                                 resultData={businessOwnerResultData}
                                 headerData={businessOwnerTableHeaderData}
                                 tableBody={BusinessOwnerTableBody}
                              />
                           </Flex>

                        }
                     </Dialog.Body>
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
      </Flex>
   )
}

export default SearchByName;