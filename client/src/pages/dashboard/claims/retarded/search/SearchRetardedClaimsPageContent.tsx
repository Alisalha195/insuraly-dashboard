import React, { useEffect, useRef, useState } from 'react'
import useThemedColors from '../../../../../hooks/useThemedColors';
import { useLocation } from 'react-router-dom';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import BackArrow from '../../../../../components/shared/BackArrow';
import SearchBox from '../../../../../components/shared/header/SearchBox';
import RetardedClaimsSearchActions from '../../../../../components/dashboard/content/baseContent/tables/claims/retarded/RetardedClaimsSearchActions';

const SearchRetardedClaimsPageContent = () => {
   const searchInputRef = useRef<HTMLInputElement>(null);
   const [searchValue, setSearchValue] = useState("");
   const { textPrimary, textSecondary} = useThemedColors();
   const location = useLocation();
   const month = location?.state?.month;
   
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
              Search for Claim
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
              <RetardedClaimsSearchActions searchValue={searchValue} month={month} />
           </Box>
           
        </VStack>
      </Flex>
   )
}

export default SearchRetardedClaimsPageContent;