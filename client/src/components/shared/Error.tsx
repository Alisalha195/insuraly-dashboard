import { Box, Center, HStack,Text, VStack } from "@chakra-ui/react"
import BackArrow from "./BackArrow";

const Error = ({message}) => {
   return (
      <Center 
         width={"100%"}
         height={"100vh"}
      >
         <VStack>
            <Text>
               {message}
            </Text>
            <Box>
               <BackArrow />
            </Box>
         </VStack>
      </Center>
   );
};
export default Error; 