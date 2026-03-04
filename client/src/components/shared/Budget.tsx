import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa6";
import useThemedColors from "../../hooks/useThemedColors";

const Budget = ({amount}) => {
   
   const {budgetText,iconGray} = useThemedColors();
  return (
    <HStack
      className="btn"
      gap={0}
      fontSize={{xssToXmm:"20px", xmmToMd:"21px"}}
      paddingX={{xssToXmm:"3px", xmmTo3xl:"5px"}}
      transition={"box-shadow 0.2s ease-in-out"}
      _hover={{boxShadow:`1px 1px 9px ${budgetText}` }}
      borderRadius={"5px"}
    >
      <Text
         color={iconGray}
         fontSize={{xssToXmm:"24px", xmmTo3xl:"28px"}}
      >
         <FaDollarSign />
      </Text>
      <Text
         fontWeight={"500"}
         color={budgetText}
         // fontSize={{xssToXs:"20px"}}
      >
         {amount}
      </Text>
    </HStack>
  )
}

export default Budget