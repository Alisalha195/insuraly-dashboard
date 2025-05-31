import {  VStack } from "@chakra-ui/react"
import SidebarList from "./SidebarList"
import Logo from "../../../shared/header/Logo"

import useThemedColors from "../../../../hooks/useThemedColors";
const Sidebar = () => {
   
   const { bgSecondary} = useThemedColors();
  return (
   
   <VStack minHeight={'90vh'}   display={{smDown:'none'}} smToMd={{width:"30%"}}   padding={1}  width={"20%"} backgroundColor={bgSecondary} className=" bg-[fff] " marginRight={1}>
      <Logo />
      <VStack paddingX={2} marginTop={4}>
         <SidebarList />
      </VStack>
      
   </VStack>
  )
}

export default Sidebar