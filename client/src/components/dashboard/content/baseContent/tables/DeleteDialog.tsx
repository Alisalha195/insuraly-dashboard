import { useState } from 'react'
import { Box, Button, CloseButton, Dialog, HStack, Menu, Portal, Text } from "@chakra-ui/react"
import useThemedColors from '../../../../../hooks/useThemedColors'


const DeleteDialog = ({ item ,msg , click, waiting }) => {
   
   // const [closeMenu , setCloseMenu ] = useState(false);
   const {hovering} = useThemedColors()
   
  return (
   <Box >
      <Dialog.Root role="alertdialog" >
   <Dialog.Trigger asChild>
      
     <Menu.Item closeOnSelect={waiting} style={{fontSize:"clamp(16px, 20px , 36px)"}}  marginBottom={1} paddingY={0} paddingX={1} className="btn" value="" backgroundColor={'transparent'} _hover={{backgroundColor:hovering}}
     
     >
       <HStack  >
          <item.icon />
          <Text>{item.title}</Text>
       </HStack>
     </Menu.Item>
   </Dialog.Trigger>
   <Portal>
     <Dialog.Backdrop />
     <Dialog.Positioner>
       <Dialog.Content>
         <Dialog.Header>
           <Dialog.Title>Are you sure?</Dialog.Title>
         </Dialog.Header>
         <Dialog.Body>
           <p>
             {msg}
           </p>
         </Dialog.Body>
         
         <Dialog.Footer>
            
           <Dialog.ActionTrigger asChild>
             <Button  variant="outline">Cancel</Button>
           </Dialog.ActionTrigger>
           
           <Dialog.ActionTrigger asChild>
              <Button disabled={waiting} onClick={ click} colorPalette="red">
            {waiting 
               ? "processing"
               : "Delete"
            }
            </Button>
            </Dialog.ActionTrigger>
         </Dialog.Footer>
         
         <Dialog.CloseTrigger asChild>
           <CloseButton size="sm" />
         </Dialog.CloseTrigger>
       </Dialog.Content>
     </Dialog.Positioner>
   </Portal>
 </Dialog.Root>
   </Box>
  )
}

export default DeleteDialog;


