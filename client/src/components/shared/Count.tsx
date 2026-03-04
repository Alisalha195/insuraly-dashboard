import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../hooks/useThemedColors";
import SkeletonLoader from "./Skeleton";

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
          fontSize={{xssToXmm:"24px", xmmTo3xl:"28px"}}
       >
          {icon}
       </Text>
       {
            // if amount is null or undefined show skeleton loader
         amount === null || amount === undefined 
         ? 
            <SkeletonLoader width="20px" height="8px"/> 
         : (
            <Text
               fontWeight={"500"}
               color={CountText}
            >  
               {amount}
            </Text>
         )  
       }
       {/* <Text
          fontWeight={"500"}
          color={CountText}
       >
          {amount}
       </Text> */}
      </HStack>
   )
}

export default Count