import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../hooks/useThemedColors";

const Count = ({icon , amount}) => {
   const {CountText, iconGray} = useThemedColors();
   return (
      <HStack
         className="btn"
         fontSize={{xssToXmm:"20px", xmmToMd:"21px"}}
         gap={"4px"}
         paddingX={{xssToXmm:"3px", xmmTo3xl:"5px"}}
         transition={"box-shadow 0.2s ease-in-out"}
         _hover={{boxShadow:`1px 1px 9px ${CountText}` }}
         borderRadius={"5px"}
         
      >
       <Text
          color={iconGray}
          fontSize={{xssToXmm:"20px", xmmTo3xl:"21px"}}
       >
          {icon}
       </Text>
       <Text
          fontWeight={"500"}
          color={CountText}
       >
          {amount}
       </Text>
      </HStack>
   )
}

export default Count