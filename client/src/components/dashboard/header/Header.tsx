import { Flex, HStack, Box  } from "@chakra-ui/react";
import UserMenu from "./UserMenu";
import SearchBox from "../../shared/header/SearchBox";
import ColorModeToggleButton from "../../shared/header/ColorModeToggleButton";
import useThemedColors from "../../../hooks/useThemedColors";
import Logo from "../../shared/header/Logo";
import FixGrowBox from "../../shared/FixGrowBox";
import SidebarDrawer from "../content/sidebar/SidebarDrawer";
import { useEffect, useRef } from "react";

const Header = ({ref}) => {
   const {bgPrimary} = useThemedColors();
    
  return (
    <HStack zIndex={1000} ref={ref}  position={'fixed'} width={{xssToSm:"100%", smToMd:"70%", mdTo3xl:"80%"}}   flexGrow={1}   paddingX={1} gap={{xmTo2xl:2}}  bg={bgPrimary} justifyContent={'space-between'} >
      <Flex className="flex w-full" paddingBottom={0}  
       xmTo3xl={{padding:1 , paddingTop:'8px'}}>
         <Flex smDown={{display:'none'}} flexDirection='column' justifyContent='center' >
            <SearchBox ref={null} isFull={false} large={false}/>
         </Flex>
         <Flex sm={{display:"none"}} flexDirection='column' justifyContent='center' >
            <Logo />
         </Flex>
         
         <FixGrowBox />
         
         <Flex 
            smDown={{display:'none'}}
            gap={2} 
            // backgroundColor={"#f0f"}
            justifyContent={"space-around"}
            paddingX={2}
         >
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