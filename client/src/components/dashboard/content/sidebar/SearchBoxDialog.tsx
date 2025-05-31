import {  CloseButton, Dialog, Field, Flex, Portal, Stack } from "@chakra-ui/react";
import { LuSearch } from 'react-icons/lu';
import { useRef } from "react";
import SearchBox from "../../../shared/header/SearchBox";

const SearchBoxDialog = () => {
   const ref = useRef<HTMLInputElement>(null)
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
             <Field.Root  marginTop={4} marginBottom={4} width={"100%"}>
               <Field.Label>search</Field.Label>
               <SearchBox ref={ref} isFull={true} large={true}/>
             </Field.Root>
           </Stack>
         </Dialog.Body>
         <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
       </Dialog.Content>
     </Dialog.Positioner>
   </Portal>
 </Dialog.Root>
  )
}

export default SearchBoxDialog