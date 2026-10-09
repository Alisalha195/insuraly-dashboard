import { Box, Flex } from "@chakra-ui/react"

const CardBadge = ({children}:{children:any}) => {
  return (
    <Flex 
       flexDirection={"column"} 
       padding={2} 
       gap={1}
       alignItems={'center'}
      //  backgroundColor={"#708"}
    >
      {children}
    </Flex>
  )
}

export default CardBadge;