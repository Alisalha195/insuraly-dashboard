import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import BusinessLogo from "../../../../components/shared/profile/business/BusinessLogo";
import Budget from "../../../../components/shared/Budget";
import Count from "../../../../components/shared/Count";

const BusinessProfileContent = () => {
  return (
    <Flex
       flexDirection={'column'}
    >
      
      {/* upper section */}
      <Flex
         flexDirection={'row'}
         justifyContent={'space-between'}
      >
         {/* left side */}
         <Flex>
            <BusinessLogo />
            <VStack>
               <Text>Business name</Text>
               <Text>owner</Text>
            </VStack>
         </Flex>
         
         {/* right side */}
         <Flex flexDirection={'column'}>
            <Budget />
            <Count />
         </Flex>
      </Flex>
    </Flex>
  )
}

export default BusinessProfileContent