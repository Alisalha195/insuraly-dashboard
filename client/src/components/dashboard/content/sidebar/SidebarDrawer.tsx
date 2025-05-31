import { Box, Button, CloseButton, Drawer, Flex, Portal } from "@chakra-ui/react"
import { MdMenu } from "react-icons/md";
import useThemedColors from "../../../../hooks/useThemedColors";
import SidebarList from "./SidebarList";
import UserMenu from "../../header/UserMenu";
import ColorModeToggleButton from "../../../shared/header/ColorModeToggleButton";
import SearchBoxDialog from "./SearchBoxDialog";

const SidebarDrawer = () => {
  const {bgPrimary, textPrimary} = useThemedColors();
  return (
   <Box display={{smTo2xl:'none'}}>
      
    <Drawer.Root >
      <Drawer.Trigger asChild>
      <Button padding={0} border={'none'} outline={'none'} backgroundColor={'transparent'} color={textPrimary}> 
          <MdMenu />
        </Button>
      </Drawer.Trigger>
      <Portal >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content width={"40%"} display={{smTo2xl:'none'}}>
            <Drawer.Header borderBottom={'4px solid #fff'} borderColor={bgPrimary}>
              <Flex marginTop={4} paddingRight={3}>
                  
                  <ColorModeToggleButton />
                  <SearchBoxDialog />
                  <UserMenu  />
              </Flex>
            </Drawer.Header>
            <Drawer.Body>
              <SidebarList />
            </Drawer.Body>
            
            <Drawer.CloseTrigger padding={0} asChild>
               <Box padding={0} border={'none'} outline={'none'}  _hover={{backgroundColor:'transparent'}}>
                  
                 <CloseButton padding={0} size="xs" _hover={{backgroundColor:'transparent'}}/>
               </Box>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
   </Box>
  )
}

export default SidebarDrawer ;
