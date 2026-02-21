import {  Box, Flex, HStack, Icon, Span, VStack } from "@chakra-ui/react"
import SidebarList from "./SidebarList"
import { lazy, Suspense } from "react";

import useThemedColors from "../../../../hooks/useThemedColors";
import Logo from "../../../shared/header/Logo"
import Footer from "../../footer/Footer";
import { useResizeObserver } from "../../../../hooks/useResizeObserver";

import { LuCircleChevronLeft } from "react-icons/lu";
import { LuCircleChevronRight } from "react-icons/lu";

import { useRef } from "react";
// const LazyLogo = lazy(()=>import("../../../shared/header/Logo"));
// const LazyFooter = lazy(()=>import("../../footer/Footer"));

const Sidebar = ({SidebarRef, SidebarSize}) => {
   
   
   const { bgSecondary} = useThemedColors();
   const [footerRef, footerSize] = useResizeObserver();
   const [logoRef, logoSize] = useResizeObserver();
   
   // const [SidebarRef, SidebarSize] = useResizeObserver();
   // const SidebarRef = useRef(null);
   
   const handleToggleSidebar = () => {
      if(SidebarRef.current){
         if(SidebarRef.current.classList.contains("collapsed")){
            SidebarRef.current.classList.remove("collapsed");
         }else{
            SidebarRef.current.classList.add("collapsed");
         }
      }
   }
  return (
   
   <VStack ref={SidebarRef} position={'relative'}  minHeight={'100vh'} maxHeight={'100vh'} overflow={'auto'}   display={{smDown:'none'}} smToMd={{width:"30%"}}      width={"20%"} backgroundColor={bgSecondary} className=" bg-[fff] collapsed " marginRight={1} paddingTop={1} transition={"width 0.3s ease-out"}
   >
      
      <Box 
         maxWidth={'20%'}
         display={SidebarRef.current && SidebarRef.current.classList.contains("collapsed") ? "none" : "block"}
      >  
         <Logo ref={logoRef} containerRef={SidebarRef}  hidden={SidebarRef.current && SidebarRef.current.classList.contains("collapsed")}/>
      </Box>
      <VStack 
         paddingX={2} 
         paddingTop={2} 
         marginTop={`${logoSize?.height }px` ?? "50px"} 
         marginBottom={`${footerSize?.height}px`}
         maxWidth={"100%"}
      >
         <SidebarList 
            collabsed={SidebarRef.current && SidebarRef.current.classList.contains("collapsed")}
         />
         {/* <SidebarList />
         <SidebarList />
         <SidebarList />
          */}
         
      </VStack>
      {/* <Suspense>
         <LazyFooter ref={footerRef} containerRef={SidebarRef}/>
      </Suspense> */}
      <Footer 
         ref={footerRef}
         containerRef={SidebarRef} 
         collabsed={SidebarRef.current && SidebarRef.current.classList.contains("collapsed")}
      />
      <Box
         position={'absolute'}
         top={"50%"}
         right={0}
         fontSize={"24px"}
      >
         
         <Span cursor={'pointer'} display={'block'}  borderRadius={"50%"}  color={"gray.500"} 
         
         onClick={()=>{
            if(SidebarRef.current){
               if(SidebarRef.current.classList.contains("collapsed")){
                  SidebarRef.current.classList.remove("collapsed");
               }else{
                  SidebarRef.current.classList.add("collapsed");
               }
            }}
         }
         >
            
            {
               SidebarRef.current && SidebarRef.current.classList.contains("collapsed") 
               ? <Icon fontSize={"30px"} as={LuCircleChevronRight} /> 
               : <Icon fontSize={"30px"} as={LuCircleChevronLeft} /> 
            }
         </Span>
      </Box>
   </VStack>
  )
}

export default Sidebar;