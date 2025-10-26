import { Box, Button, CloseButton, Drawer, Flex, Portal } from "@chakra-ui/react"
import { MdMenu } from "react-icons/md";
import useThemedColors from "../../../../hooks/useThemedColors";
import SidebarList from "./SidebarList";
import UserMenu from "../../header/UserMenu";
import ColorModeToggleButton from "../../../shared/header/ColorModeToggleButton";
import SearchBoxDialog from "./SearchBoxDialog";
import SidebarSearchActions from "./SidebarSearchActions";

const SidebarDrawer = () => {
   const { bgPrimary, textPrimary } = useThemedColors();
   return (
      <Box display={{ smTo2xl: 'none' }}>

         <Drawer.Root >
            <Drawer.Trigger asChild>
               <Button padding={0}
                  border={'none'}
                  outline={'none'}
                  backgroundColor={'transparent'}
                  color={textPrimary}
                  size={{ xmDown: "xs" }}

               >
                  <MdMenu />
               </Button>
            </Drawer.Trigger>
            <Portal >
               <Drawer.Backdrop />
               <Drawer.Positioner>
                  <Drawer.Content width={{ xssToXm: "100%", xmToSm: "auto" }} display={{ smTo2xl: 'none' }}
                     paddingTop={0}
                  >
                     <Drawer.Header borderBottom={'4px solid #fff'} borderColor={bgPrimary}
                        paddingTop={"10px"}
                        paddingLeft={'10px'}
                        paddingBottom={'10px'}
                     >
                        <Flex marginTop={4} paddingRight={2}
                           alignContent={"end"}
                           justifyContent={"start"}

                        >

                           <ColorModeToggleButton />
                           <SearchBoxDialog
                              title={"serach"}
                              SearchActions={SidebarSearchActions}
                           />
                           <UserMenu />
                        </Flex>
                     </Drawer.Header>
                     <Drawer.Body
                        paddingRight={'10px'}
                        paddingLeft={'20px'}
                     >
                        <SidebarList />
                     </Drawer.Body>

                     <Drawer.CloseTrigger padding={0} asChild>
                        <Box
                           padding={0}
                           border={'none'}
                           outline={'none'}
                           _hover={{ backgroundColor: 'transparent' }}

                        >

                           <CloseButton
                              padding={0}
                              size="xs"
                              _hover={{ backgroundColor: 'transparent' }}
                              paddingBottom={'30px'}
                              paddingLeft={'30px'}
                           />
                        </Box>
                     </Drawer.CloseTrigger>
                  </Drawer.Content>
               </Drawer.Positioner>
            </Portal>
         </Drawer.Root>
      </Box>
   )
}

export default SidebarDrawer;
