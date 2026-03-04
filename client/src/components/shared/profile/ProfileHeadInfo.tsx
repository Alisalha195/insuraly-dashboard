
import { Box, Flex, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import useThemedColors from "../../../hooks/useThemedColors.ts";
import { capitalize } from "../../../lib/capitalize.ts";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { emailFormat } from "../../../lib/textFormating.ts";

const ProfileHeadInfo = ({ data }) => {

   const { textPrimary, textSecondary, textEmail } = useThemedColors();

   return (
      <Flex flexDirection={"column"}>
          
         {/* Name */}
         <Flex flexDirection={'column'}
            color={textPrimary} marginBottom={1} alignContent={'start'}
         >
            <Text 
               fontWeight={'500'}
               fontSize={{xssToXs:"18px", xsToXm:"21px", xmToSm:"23px", smToMd:"25px"}}
            >
               { (data?.first_name && data?.last_name) ?
               `${capitalize(
                  data?.first_name
               )} ${capitalize(
                  data?.last_name
               )}`
               : "User Name Unavailable"
               }
            </Text>
         </Flex>

         {/* email */}
         <Flex  alignItems={'end'} marginBottom={"3px"}>
            <Flex
               // paddingTop={"2px"}
               flexDirection={"column"}
               justifyContent={"start"}
               color={textSecondary}
            >
               <Text fontSize={{ xssToXm: "19px", xmToXmm: "20px", xmmToSm: "21px", smTo2xl: "23px" }}>
                  <MdOutlineEmail />
               </Text>
            </Flex>
            <Text marginLeft={1} lineHeight={"normal"} fontSize={{ xssToXm: "14px", xmToSm:"16px" }} color={textEmail} lineBreak={'anywhere'} overflow={'hidden'}>
               {data?.email 
                  ? emailFormat(data?.email, 20)
                  : "unavailable"
               }
            </Text>
         </Flex>

         {/* phone number */}
         <Flex>
            <HStack
               // flexDirection={"column"}
               // justifyContent={"start"}
               color={textSecondary}
            >
               <Text fontSize={{ xssToXm: "18px", xmToXmm: "19px", xmmToSm: "20px", smTo2xl: "22px" }}>
                  <BsTelephone />
               </Text>
            </HStack>
            <Text marginLeft={1} lineHeight={"normal"} fontSize={{ xssToXm: "14px",  xmToSm:"16px" }} color={textEmail} lineBreak={'anywhere'}>
               {
                  data?.phone_number 
                  ? data?.phone_number
                  : "unavailable"
                  
               }
            </Text>
         </Flex>
      </Flex>
   );
}
export default ProfileHeadInfo;