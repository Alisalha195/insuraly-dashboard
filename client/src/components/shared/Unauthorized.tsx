import { Flex, Span, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
   
   const {t} = useTranslation();
   const navigate = useNavigate();
  return (
    <Flex flexDirection="row" width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
     <Flex flexDirection={'column'} justifyContent={"center"} alignItems={"center"}> 
        <Text fontWeight={600} fontSize={"26px"}>
            {t("UnAuthorized Access")}
         </Text>
         <Span backgroundColor={"#456"} paddingX={"8px"} borderRadius={"9px"} className='btn' onClick={()=> navigate(-1)}>
            <Text fontWeight={500} fontSize={"20px"} color={"#fff"}>
               {t("back")}
            </Text>
         </Span>
     </Flex>
      
    </Flex>
  )
}

export default Unauthorized