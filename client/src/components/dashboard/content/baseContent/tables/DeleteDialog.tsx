import { useState } from 'react'
import { Box, Button, CloseButton, Dialog, HStack, Menu, Portal, Text } from "@chakra-ui/react"
import useThemedColors from '../../../../../hooks/useThemedColors'


const DeleteDialog = ({ item, msg, click, waiting, styles }) => {

   // const [closeMenu , setCloseMenu ] = useState(false);
   const { hovering, textSecondary,btnDanger,btnGray } = useThemedColors()

   return (
      <Box >
         <Dialog.Root role="alertdialog" >
            <Dialog.Trigger asChild>

               <Menu.Item
                  closeOnSelect={waiting}
                  fontSize={{ xssToXm: "14px", xmToSm: "15px" }}
                  marginBottom={1}
                  paddingY={0}
                  paddingX={1}
                  className="btn"
                  value=""
                  backgroundColor={'transparent'}
                  _hover={{ backgroundColor: hovering }}
                  {...styles}
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
                        <Dialog.Title>
                           <Text
                              fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "19px", smToMd: "21px" }}
                           >
                              Are you sure?
                           </Text>
                        </Dialog.Title>
                     </Dialog.Header>
                     <Dialog.Body>
                        <p>
                           {msg}
                        </p>
                     </Dialog.Body>

                     <Dialog.Footer>

                        <Dialog.ActionTrigger asChild>
                           <Box
                              className='btn'
                              borderWidth={1}
                              color={btnGray}
                              borderColor={btnGray}
                              paddingX={{xssToXs: "4px", xsToXm: "6px", xmToSm: "7px", smToMd: "9px", mdTo3xl:"11px"}}
                              paddingY={{xssToXs: "1px", xsToXm: "3px", xmToSm: "4px", smToMd: "5px", mdTo3xl:"6px"}}
                              borderRadius={"6px"}
                              fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "19px", smToMd: "21px" }}
                           >
                              Cancel
                           </Box>
                           {/* <Button variant="outline">Cancel</Button> */}
                        </Dialog.ActionTrigger>

                        <Dialog.ActionTrigger asChild>
                           <Box
                            className='btn'
                            borderWidth={1}
                            borderColor={btnDanger}
                           backgroundColor={btnDanger}
                           color={'white'}
                            paddingX={{xssToXs: "4px", xsToXm: "6px", xmToSm: "7px", smToMd: "9px", mdTo3xl:"11px"}}
                            paddingY={{xssToXs: "1px", xsToXm: "3px", xmToSm: "4px", smToMd: "5px", mdTo3xl:"6px"}}
                            borderRadius={"6px"}
                            fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "19px", smToMd: "21px" }}
                              disabled={waiting}
                              onClick={click}
                              colorPalette="red"
                           // fontSize={{ xssToXm: "14px", xmToSm: "15px" }}
                           >
                              {waiting
                                 ? "processing"
                                 : "Delete"
                              }
                           </Box>
                        </Dialog.ActionTrigger>
                     </Dialog.Footer>

                     <Dialog.CloseTrigger asChild>
                        <CloseButton size="xs" />
                     </Dialog.CloseTrigger>
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
      </Box>
   )
}

export default DeleteDialog;


