import useThemedColors from '@/hooks/useThemedColors';
import { Flex, Span, Text } from '@chakra-ui/react';
import React from 'react'

const UserPageContent = () => {
   const {textSecondary} = useThemedColors();
  return (
    <Flex direction={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100%'}>
      <Text>
         <Span 
            fontSize={"40px"}
            fontStyle={'italic'}
            fontFamily={"cursive"}
            marginEnd={"10px"}
            color={"#440099"}
         >Ready</Span> 
         <Span 
            fontFamily={"cursive"} 
            color={textSecondary}
         >To Reserve Your Staff Rights ? Health and Retirements ?</Span>
      </Text>
      <Text 
         fontFamily={"cursive"}
         color={textSecondary}
      >with insuraly app you will be able to</Text>
      <Text
         marginTop={"50px"}
         fontSize={"20px"}
         color={"#229911"}
         className='btn'
         fontWeight={'bold'}
         border={"1px solid #229911"}
         padding={"6px 20px"}
         borderRadius={"5px"}
      >Download</Text>
    </Flex>
  )
}

export default UserPageContent;