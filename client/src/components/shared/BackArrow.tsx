import { Flex, HStack, Text } from '@chakra-ui/react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import React from 'react'

const BackArrow = () => {
   const navigate = useNavigate();
   return (
      <Flex>
         <HStack className='btn'  gap={0} onClick={()=>navigate(-1)}>
            <IoIosArrowBack  />
            <Text fontSize={'20px'}>back</Text>
       </HStack>
      </Flex>
  )
}

export default BackArrow;