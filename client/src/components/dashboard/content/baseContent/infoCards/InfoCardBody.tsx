import { Flex, SkeletonText, Text } from "@chakra-ui/react";
import useThemedColors from "../../../../../hooks/useThemedColors";
import { Suspense } from "react";

const InfoCardBody = ({ amount, textColor }) => {
   const { textSecondary } = useThemedColors();
   return (
      <Flex>
            <Text
               className=""
               fontSize={{ xssToXm: "24px", xmToXmm: "30px", xmmToSm: "34px" }}
               color={textColor}
            >
               {amount}
            </Text>
      </Flex>
   );
};

export default InfoCardBody;

// <SkeletonText noOfLines={1}  />
