import { Box, Flex } from "@chakra-ui/react"

const CardContent = ({children , ...props}:{children:any}) => {
  return (
    <Flex 
     {...props}
    >
      {children}
    </Flex>
  )
}

export default CardContent