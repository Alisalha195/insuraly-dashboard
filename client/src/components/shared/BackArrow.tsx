import { Flex, HStack, Text } from '@chakra-ui/react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import React from 'react'

const BackArrow = () => {
   const navigate = useNavigate();
   return (
      <Flex>
         <HStack className='btn' gap={0} onClick={() => navigate(-1)}>
            <Text fontSize={{ xssToXs: "0.7rem", xsToXm: "0.8rem", xmToSm: "0.9rem" }}>
               <IoIosArrowBack />
            </Text>
            <Text fontSize={{ xssToXs: "0.6rem", xsToXm: "0.7rem", xmToSm: "0.8rem" }}>
               back
            </Text>
         </HStack>
      </Flex>
   )
}

export default BackArrow;