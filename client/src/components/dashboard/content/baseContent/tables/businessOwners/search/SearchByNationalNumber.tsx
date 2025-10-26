
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../../../../constants/connection.ts";

import BusinessOwnerTableHeader from "../BusinessOwnerTableHeader"
import BusinessOwnerTableBody from "../BusinessOwnerTableBody"
import SearchResults from "../../search/SearchResults";
import { businessOwnerTableHeaderData } from "../businessOwnerTableHeaderData.ts"


const SearchByNationalNumber = ({ searchValue }) => {

   const { btnGreen, textPrimary } = useThemedColors();

   const { data: businessOwnerResultData,
      error: businessOwnerResultDataError,
      isLoading: businessOwnerResultDataIsLoading,
   } = useQuery({
      queryKey: ['business-owners-search-results-national', searchValue],
      queryFn: () => fetch(`${host}/businessOwners/get/national-number`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ searchValue: searchValue }) }).then(res => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

   return (
      <Dialog.Root scrollBehavior="inside" size="sm">
         <Dialog.Trigger asChild >
            <Button disabled={businessOwnerResultDataIsLoading} className='btn' backgroundColor={btnGreen} paddingX={{ xssToXmm: "5px", xmmTo2xl: "6px" }} borderRadius={6} paddingY={1} height={'auto'} lineHeight={1} color={textPrimary} marginBottom={{ xssToXmm: "7px" }} fontSize={{ xssToXm: "15px", xmToSm: "16px" }}>
               national number
            </Button>
         </Dialog.Trigger>
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content>
                  <Dialog.Header>
                     <Dialog.Title>
                        <Text fontSize={{ xssToXm: "16px", xmToSm: "18px" }}>
                           search by national number for :
                        </Text>
                        <Text textAlign={'center'}>
                           {searchValue}
                        </Text>
                     </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.CloseTrigger asChild>
                     <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                  <Dialog.Body>
                     {
                        businessOwnerResultData &&

                        < SearchResults
                           resultData={businessOwnerResultData}
                           headerData={businessOwnerTableHeaderData}
                           tableBody={BusinessOwnerTableBody}
                        />
                     }
                  </Dialog.Body>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   )
}

export default SearchByNationalNumber