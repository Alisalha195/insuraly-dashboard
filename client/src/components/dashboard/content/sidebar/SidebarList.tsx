
import { sidabarListData } from "./sidebarListData";
import DropDownGroup from "./DropDownGroup";
import {  Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SidebarList = () => {
   const navigate = useNavigate()

   return (
      <>
         <Flex justifyContent={"start"} width={"full"} borderBottom={"1px solid #fff"} >
            <Text className="btn" paddingX={1} onClick={()=>navigate("/dashboard")}>Dashboard</Text>
         </Flex>
         <DropDownGroup data={sidabarListData}/>
      </>
   );
}

export default SidebarList;
