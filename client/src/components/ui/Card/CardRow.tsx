import { Flex } from '@chakra-ui/react'
import React from 'react'

const CardRow = ({children}:{children:any}) => {
  return (
   <Flex 
      flexDirection={"row"} 
      // padding={1}
      width={"100%"} 
      // gap={1}
      // alignItems={'center'}
      // backgroundColor={"#708"}
   >
     {children}
   </Flex>
  )
}

export default CardRow