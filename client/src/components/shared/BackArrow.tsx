import { Flex, HStack, Text } from '@chakra-ui/react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import React from 'react'
import { useTranslation } from 'react-i18next';
import useLangDir from '../../hooks/useLangDir';

const BackArrow = ({...props}) => {
   const navigate = useNavigate();
   
   const {t} = useTranslation();
   const {isRTL, dir} = useLangDir();
      
   return (
      <Flex>
         <HStack ref={props?.ref ?? null} className='btn' gap={0} onClick={() => navigate(-1)}>
            <Text fontSize={{ xssToXs: "0.7rem", xsToXm: "0.8rem", xmToSm: "0.9rem" }} _rtl={{transform : "rotate(180deg)"}} transition='.3s ease'>
               <IoIosArrowBack />
            </Text>
            <Text fontSize={{ xssToXs: "0.6rem", xsToXm: "0.7rem", xmToSm: "0.8rem" }}>
               {t("back")}
            </Text>
         </HStack>
      </Flex>
   )
}

export default BackArrow;