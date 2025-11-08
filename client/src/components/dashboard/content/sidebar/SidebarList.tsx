
import { sidabarListData } from "./sidebarListData";
import DropDownGroup from "./DropDownGroup";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import useThemedColors from '../../../../hooks/useThemedColors';

const SidebarList = () => {
   const navigate = useNavigate();
   const { btnSecondary, textPrimary, borderSecondary } = useThemedColors();

   return (
      <>
         <Flex
            justifyContent={"start"}
            width={"full"}
            marginBottom={{ xssToXm: "10px", xmToSm: "10px" }}
            borderBottomWidth={"2px"}
            borderColor={borderSecondary}
            paddingBottom={1}
         >
            <Text
               className="btn"
               paddingX={1}
               onClick={() => navigate("/dashboard")}
               fontSize={{ xssToXs: "15px", xsToXm: "18px", xmTo3xl: "22px" }}
            >
               Dashboard
            </Text>
         </Flex>
         {/* <Box
            maxWidth={"100%"}
            overflow={'hidden'}
         > */}
            <DropDownGroup data={sidabarListData} />
         {/* </Box> */}
      </>
   );
}

export default SidebarList;
