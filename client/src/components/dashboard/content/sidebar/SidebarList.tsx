
import { sidabarListData } from "./sidebarListData";
import DropDownGroup from "./DropDownGroup";
import { Box, Flex, Span, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import useThemedColors from '../../../../hooks/useThemedColors';
import { useEffect } from "react";

import { AiOutlineHome } from "react-icons/ai";

const SidebarList = ({collabsed=false}) => {
   const navigate = useNavigate();
   const { btnSecondary, textPrimary, borderSecondary,brand } = useThemedColors();

   return (
      <>
         <Flex
            justifyContent={"start"}
            // width={"full"}
            marginBottom={{ xssToXm: "10px", xmToSm: "10px" }}
            borderBottomWidth={"2px"}
            borderColor={borderSecondary}
            paddingBottom={1}
         >
            <Text
               className="btn"
               paddingX={1}
               textAlign={'center'}
               onClick={() => navigate("/dashboard")}
               fontSize={{ xssToXs: "15px", xsToXm: "18px", xmTo3xl: "22px" }}
               
            >
               { !collabsed ? "Dashboard" : <Span fontSize={"26px"} color={brand}><AiOutlineHome   /></Span> }
            </Text>
         </Flex>
         {/* <Box
            maxWidth={"100%"}
            overflow={'hidden'}
         > */}
            <DropDownGroup data={sidabarListData} collabsed={collabsed} />
         {/* </Box> */}
      </>
   );
}

export default SidebarList;
