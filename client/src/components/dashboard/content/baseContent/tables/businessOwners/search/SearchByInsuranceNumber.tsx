
import {  Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import SearchResults from "./SearchResults";
import { useQuery } from "@tanstack/react-query";
import {host} from "../../../../../../../constants/connection.ts";

const SearchByInsuranceNumber = ({searchValue}) => {
   const {btnGreen, textPrimary} = useThemedColors();
         
   const {data:businessOwnerResultData, 
      error:businessOwnerResultDataError, 
      isLoading:businessOwnerResultDataIsLoading, 
    } = useQuery({ 
      queryKey: ['business-owners-search-results-insurance',searchValue ], 
      queryFn: () => fetch(`${host}/businessOwners/get/insurance-number`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify({searchValue:searchValue})}).then(res =>  res.json()),
         refetchInterval : 5000,
         keepPreviousData: true ,
         staleTime : 30000,
   });
  return (
   <Dialog.Root scrollBehavior="inside" size="sm">
   <Dialog.Trigger asChild >
        <Button disabled={businessOwnerResultDataIsLoading}  className='btn' backgroundColor={btnGreen} paddingX={2} borderRadius={6} paddingY={1} height={'auto'} lineHeight={1} color={textPrimary}>
           insurance number
        </Button>
      </Dialog.Trigger>
   <Portal>
     <Dialog.Backdrop />
     <Dialog.Positioner>
       <Dialog.Content>
         <Dialog.Header>
            <Dialog.Title>search by insurance number for
               <Text textAlign={'center'}>{searchValue}</Text>
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
            />
         }
         </Dialog.Body>
       </Dialog.Content>
     </Dialog.Positioner>
   </Portal>
 </Dialog.Root>
  )
}

export default SearchByInsuranceNumber;