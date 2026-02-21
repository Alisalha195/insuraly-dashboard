import {  Box , Flex, HStack, Span, Text } from "@chakra-ui/react"

import useThemedColors from "../../../hooks/useThemedColors"
import { useEffect, useState } from "react";
import { getScrollBarWidth } from "../../../lib/helpers";
import LogoBasic from "./LogoBasic";

const Logo = ({ref,containerRef, ...props}) => {
   const { logoText, logoBackground} = useThemedColors();
   
   const[footerWidth , setFooterWidth] = useState({
      xmToMd : (0.3 * window.innerWidth) - (getScrollBarWidth(containerRef) + getScrollBarWidth(containerRef) / 4 ),
      mdTo3xl : (0.2 * window.innerWidth) - (getScrollBarWidth(containerRef) + getScrollBarWidth(containerRef) / 4 )
   });
   
   useEffect(()=>{
      setFooterWidth({
         xmToMd : (0.3 * window.innerWidth) - (getScrollBarWidth(containerRef) + getScrollBarWidth(containerRef) / 4 ) ,
         mdTo3xl : (0.2 * window.innerWidth) - (getScrollBarWidth(containerRef) + getScrollBarWidth(containerRef) / 4 )
      })
   },[window.innerWidth, getScrollBarWidth(containerRef)]);
   
   return (
      <Box 
         ref={ref} 
         width={{xssToMd: `${footerWidth.xmToMd}px` , mdTo3xl:`${footerWidth.mdTo3xl}px`}}
         position={'fixed'}
         // backgroundColor={"#f0f"}
         display={props?.hidden ? "none" : "block"}
      >
         <LogoBasic /> 
      </Box>
   )
   
   // return (
   //    <Box
   //       position="fixed"
   //       top="20px"
   //       left="20px"
   //       padding="10px 20px"
   //       background="linear-gradient(90deg, #4A90E2, #50E3C2)"
   //       borderRadius="12px"
   //       boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
   //       zIndex="1000"
   //    >
   //       <Flex justifyContent="center" alignItems="center">
   //          <Text
   //             fontSize="24px"
   //             fontWeight="bold"
   //             fontStyle="italic"
   //             color={logoText || "white"}
   //             textTransform="uppercase"
   //             letterSpacing="2px"
   //             backgroundClip="text"
   //             backgroundColor={logoBackground || "transparent"}
   //          >
   //             Insuraly
   //          </Text>
   //       </Flex>
   //    </Box>
   // );
  
}

export default Logo