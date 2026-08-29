import { Box, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import BackArrow from '../../../../components/shared/BackArrow'
import useThemedColors from '../../../../hooks/useThemedColors';
import SearchBox from '../../../../components/shared/header/SearchBox';
import BusinessSearchActions from '../../../../components/dashboard/content/baseContent/tables/businesses/BusinessSearchActions';
import { useTranslation } from 'react-i18next';

const SearchBusinessesContent = () => {
   
   const searchInputRef = useRef<HTMLInputElement>(null);
   const [searchValue, setSearchValue] = useState("");
   const { textPrimary, textSecondary} = useThemedColors();
   const {t} = useTranslation();
   
   useEffect(()=>{
      // setInterval(() => {
      //    searchInputRef.current?.focus();
      // }, 200);
      searchInputRef.current?.focus();
      
   },[]);
   
   
  return (
    <Flex direction={'column'} >
      <BackArrow />
      
      <VStack >
         <Text color={textSecondary} fontWeight={500}>
            {t("searchForBusinesses")}
         </Text>
         <Box width={{xssToXmm:"90%", xmmTo3xl:"60%"}}>
            <SearchBox 
               isFull={true}
               large={false}
               setSearchValue={setSearchValue}
               ref={searchInputRef}
            />
         </Box>
         <Box backgroundColor={'$f00'} width={'100%'} >
            <BusinessSearchActions searchValue={searchValue} />
         </Box>
         
      </VStack>
    </Flex>
  )
}

export default SearchBusinessesContent;