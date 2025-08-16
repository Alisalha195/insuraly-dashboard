import {  Box, CloseButton, Dialog, Field, Flex, Portal, Stack } from "@chakra-ui/react";
import { LuSearch } from 'react-icons/lu';
import {  useRef, useState } from "react";
import SearchBox from "../../../shared/header/SearchBox";


const SearchBoxDialog = ({title, SearchActions}) => {
   
   const ref = useRef<HTMLInputElement>(null)
   
   const [searchValue , setSearchValue] = useState("")
   
  return (
   <Dialog.Root initialFocusEl={() => ref.current}>
   <Dialog.Trigger asChild>
      <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1}>
        <LuSearch className='btn text-[36px]'/> 
      </Flex>
   </Dialog.Trigger>
   <Portal>
     <Dialog.Backdrop />
     <Dialog.Positioner>
       <Dialog.Content >
         <Dialog.Body pb="4" padding={"30px"}  >
           <Stack gap="4">
             <Field.Root  marginTop={4} marginBottom={1} width={"100%"}>
               <Field.Label>{title}</Field.Label>
               <SearchBox   
                  
                  setSearchValue={setSearchValue}
                  ref={ref} 
                  isFull={true} 
                  large={true}
               />
             </Field.Root>
           </Stack>
         </Dialog.Body>
         <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
         </Dialog.CloseTrigger>
         <Box marginBottom={2}>
            <SearchActions searchValue={searchValue} />
         </Box>
       </Dialog.Content>
     </Dialog.Positioner>
     
   </Portal>
 </Dialog.Root>
  )
}

export default SearchBoxDialog