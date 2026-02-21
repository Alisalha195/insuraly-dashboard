import { Box, Flex, Span } from "@chakra-ui/react";
import { getScrollBarWidth } from "../../../lib/helpers";
import { useEffect, useState } from "react";
import useThemedColors from "../../../hooks/useThemedColors";

const Footer = ({ref,containerRef, collabsed}) => {
   
   const { footerBg} = useThemedColors();
   
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
   
   if(collabsed){
      return null;
   }
   return (
      <Box 
         ref={ref}
         position={'fixed'}
         bottom={0}
         backgroundColor={"#f00"}
         width={{xmToMd: `${footerWidth?.xmToMd}px` , mdTo3xl:`${footerWidth?.mdTo3xl}px`}}
      >
        <Flex
           backgroundColor={footerBg}
           justifyContent={"space-around"}
        >
         <Span>
            all rights reserved @2025
         </Span>
        </Flex>
      </Box>
   )
}

export default Footer