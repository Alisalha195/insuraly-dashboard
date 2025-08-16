
import { Button, CloseButton, Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { host } from "../../../../../../../constants/connection.ts";

import BusinessTableHeader from "../BusinessTableHeader";
import BusinessTableBody from "../BusinessTableBody";
import SearchResults from "../../search/SearchResults";

const SearchByName = ({ searchValue }) => {

   const { btnGreen, textPrimary } = useThemedColors();

   const { data: businessResultData,
      error: businessResultDataError,
      isLoading: businessResultDataIsLoading,
   } = useQuery({
      queryKey: ['business-search-results-name', searchValue],
      queryFn: () => fetch(`${host}/business/get/name/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ searchValue: searchValue }) }).then(res => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

   return (
      <Flex justifyContent={'center'}>
         <Dialog.Root size="full" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild >
               <Button disabled={businessResultDataIsLoading} className='btn' backgroundColor={btnGreen} paddingX={2} borderRadius={6} paddingY={1} height={'auto'} lineHeight={1} color={textPrimary}>
                  name
               </Button>
            </Dialog.Trigger>
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content>
                     <Dialog.Header>
                        <Dialog.Title>search by name for
                           <Text textAlign={'center'}>{searchValue}</Text>
                        </Dialog.Title>
                     </Dialog.Header>
                     <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                     </Dialog.CloseTrigger>
                     <Dialog.Body  >
                        {

                           businessResultData &&
                           <Flex justifyContent={"center"}>
                              < SearchResults
                                 resultData={businessResultData}
                                 tableHeader={BusinessTableHeader}
                                 tableBody={BusinessTableBody}
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