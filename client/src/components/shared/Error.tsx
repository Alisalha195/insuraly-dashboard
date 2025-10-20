import { HStack,Text } from "@chakra-ui/react"

const Error = ({message}) => {
   return (
      <HStack 
         width={"100vw"}
         height={"100vh"}
      >
         <Text>
            {message}
         </Text>
      </HStack>
   );
};
export default Error; 