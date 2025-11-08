import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import BusinessLogo from "../../../../components/shared/profile/business/BusinessLogo";
import Budget from "../../../../components/shared/Budget";
import Count from "../../../../components/shared/Count";
import { MdPeopleAlt } from "react-icons/md";
import useThemedColors from "../../../../hooks/useThemedColors";

import { useNavigate } from "react-router-dom";
import BackArrow from "../../../../components/shared/BackArrow";
import PageHeadTitle from "../../../../components/shared/PageHeadTitle";

const BusinessProfileContent = () => {
   
   const navigate = useNavigate();
   
   const {textPrimary, textSecondary} = useThemedColors();
  return (
    <Flex
       flexDirection={'column'}
    >
      <PageHeadTitle 
         title={"Costline Medical Group"}
         backButton={true}
      />
      
      {/* upper section */}
      <Flex
         flexDirection={{xssToXmm:"column", xmmTo3xl:"row"}}
         justifyContent={'space-between'}
         // paddingTop={"20px"}
         paddingX={"20px"}
      >
         {/* left side */}
         <Flex>
            <Flex
             flexDirection={'column'}
            >
               <Flex>
                  {/* <BusinessLogo /> */}
                  {/* <Text
                     color={textPrimary}
                     fontWeight={"500"}
                     fontFamily={"sans-serif"}
                     fontSize={{xssToXs:"20px", xsToSm:"21px"}}
                     
                  >
                     Costline Medical Group
                  </Text> */}
               </Flex>
               <Text
                  color={textSecondary}
                  fontSize={{xssToXs:"18px", xsToSm:"19px"}}
                  fontStyle={'italic'}
               >
                  John Doe
               </Text>
               <Flex
                  color={textSecondary}
                  fontSize={{xssToXs:"15px", xsToSm:"17px"}}
                  
               >
                  <Text>
                     2020
                  </Text>
               </Flex>
            </Flex>
         </Flex>
         
         {/* right side */}
         <Flex 
            flexDirection={{xssToXm:"column",xmToXmm:"row", xmmTo3xl:"column"}}
            justifyContent={'space-between'}
            gap={{xssToXm:"8px" , xmTo3xl:"12px"}}
            paddingTop={{xssToXmm:"28px", xmmTo3xl:0}}
         >
            <Box onClick={()=>navigate("/dashboard/businesses/5/budget")}>
               <Budget 
                  amount={"300,240"}
               />
               
            </Box>
            <Box onClick={()=>navigate("/dashboard/businesses/5/employees")}>
               <Count 
                  icon={<MdPeopleAlt />}
                  amount={"24,250"}
               />
            </Box>
            
         </Flex>
      </Flex>
    </Flex>
  )
}

export default BusinessProfileContent