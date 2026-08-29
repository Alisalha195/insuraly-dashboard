import { Flex, HStack, Box  } from "@chakra-ui/react";
import UserMenu from "./UserMenu";
import SearchBox from "../../shared/header/SearchBox";
import ColorModeToggleButton from "../../shared/header/ColorModeToggleButton";
import useThemedColors from "../../../hooks/useThemedColors";
import Logo from "../../shared/header/Logo";
import FixGrowBox from "../../shared/FixGrowBox";
import SidebarDrawer from "../content/sidebar/SidebarDrawer";
import { useEffect, useRef } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import LogoBasic from "../../shared/header/LogoBasic";
import LanguageToggleButton from "../../shared/header/LanguageToggleButton";

const Header = ({ref, SidebarSize , ...props}) => {
   
   const [logoRef, logoSize] = useResizeObserver();
   
   const {bgPrimary, borderSecondary, textSecondary, headerBackground} = useThemedColors();
    
  return (
    <HStack 
      zIndex={1000} 
      ref={ref}  
      position={'fixed'} 
      width={{xssToSm:"100%", smTo3xl: `calc(100% - ${SidebarSize?.width}px)`}}
      flexGrow={1}   
      paddingX={1} 
      gap={{xmTo2xl:2}}  
      bg={headerBackground} 
      justifyContent={'space-between'} 
      backgroundColor={headerBackground} 
   >
      <Flex className="flex w-full" paddingBottom={0}  
       xmTo3xl={{padding:1 , paddingTop:'8px'}}>
         
         {
            (props?.logo)
            ?  <Flex  flexDirection='column' justifyContent='center' marginRight={5}>
                  <LogoBasic />
               </Flex>
            : null
         }
         
         
         <Flex smDown={{display:'none'}} flexDirection='column' justifyContent='center' 
         >
            <SearchBox setSearchValue={()=>{}} ref={null} isFull={false} large={false}/>
         </Flex>
         
         
         <FixGrowBox />
         
         <Flex 
            smDown={{display:'none'}}
            gap={2} 
            // backgroundColor={"#f0f"}
            justifyContent={"space-around"}
            paddingX={2}
         >
            <LanguageToggleButton />
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

export default Header;