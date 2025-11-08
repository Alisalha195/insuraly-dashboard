import {  Box, Flex, HStack, VStack } from "@chakra-ui/react"
import SidebarList from "./SidebarList"
import { lazy, Suspense } from "react";

import useThemedColors from "../../../../hooks/useThemedColors";
import Logo from "../../../shared/header/Logo"
import Footer from "../../footer/Footer";
import { useResizeObserver } from "../../../../hooks/useResizeObserver";

import { useRef } from "react";
// const LazyLogo = lazy(()=>import("../../../shared/header/Logo"));
// const LazyFooter = lazy(()=>import("../../footer/Footer"));

const Sidebar = () => {
   
   
   const { bgSecondary} = useThemedColors();
   const [footerRef, footerSize] = useResizeObserver();
   const [logoRef, logoSize] = useResizeObserver();
   
   const [SidebarRef, SidebarSize] = useResizeObserver();
   // const SidebarRef = useRef(null);
   
  return (
   
   <VStack ref={SidebarRef} position={'relative'}  minHeight={'100vh'} maxHeight={'100vh'} overflow={'auto'}   display={{smDown:'none'}} smToMd={{width:"30%"}}      width={"20%"} backgroundColor={bgSecondary} className=" bg-[fff] " marginRight={1} paddingTop={1}>
      
      <Box 
         maxWidth={'20%'}
      >  
         <Logo ref={logoRef} containerRef={SidebarRef} />
      </Box>
      <VStack 
         paddingX={2} 
         paddingTop={2} 
         marginTop={`${logoSize?.height }px` ?? "50px"} 
         marginBottom={`${footerSize?.height}px`}
         maxWidth={"100%"}
      >
         <SidebarList />
         {/* <SidebarList />
         <SidebarList />
         <SidebarList />
          */}
         
      </VStack>
      {/* <Suspense>
         <LazyFooter ref={footerRef} containerRef={SidebarRef}/>
      </Suspense> */}
      <Footer ref={footerRef} containerRef={SidebarRef}/>
   </VStack>
  )
}

export default Sidebar