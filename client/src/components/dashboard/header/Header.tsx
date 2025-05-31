import { Flex, HStack, Box  } from "@chakra-ui/react";
import UserMenu from "./UserMenu";
import SearchBox from "../../shared/header/SearchBox";
import ColorModeToggleButton from "../../shared/header/ColorModeToggleButton";
import useThemedColors from "../../../hooks/useThemedColors";
import Logo from "../../shared/header/Logo";
import FixGrowBox from "../../shared/FixGrowBox";
import SidebarDrawer from "../content/sidebar/SidebarDrawer";

const Header = () => {
   const {bgPrimary} = useThemedColors();
  return (
    <HStack  paddingX={1} gap={2}  bg={bgPrimary} justifyContent={'space-between'} >
      <Flex className="flex w-full" paddingBottom={0} paddingTop={1} smDown={{padding:1 , paddingTop:'8px'}}>
         <Flex smDown={{display:'none'}} flexDirection='column' justifyContent='center' >
            <SearchBox ref={null} isFull={false} large={false}/>
         </Flex>
         <Flex sm={{display:"none"}} flexDirection='column' justifyContent='center' >
            <Logo />
         </Flex>
         
         <FixGrowBox />
         
         <Flex smDown={{display:'none'}}>
            <ColorModeToggleButton />
            <UserMenu />
         </Flex>
         
         <Flex sm={{display:"none"}} flexDirection={'column'} justifyContent={'center'}>
            <Box className="btn [padding:3px]" >
               <SidebarDrawer />
            </Box>
         </Flex>
      </Flex>
      
    </HStack>
  )
}

export default Header