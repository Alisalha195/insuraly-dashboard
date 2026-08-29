import { Box, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

import SearchBox from '../../../../../components/shared/header/SearchBox';
import BackArrow from '../../../../../components/shared/BackArrow';
import useThemedColors from '../../../../../hooks/useThemedColors';
import EmployeeSearchActions from '../../../../../components/dashboard/content/baseContent/tables/employees/search/EmployeeSearchActions';
import { useTranslation } from 'react-i18next';

const SearchEmployeesContent = ({businessName , businessID}) => {
   
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
         <Text fontWeight={"500"} color={textSecondary}>
            {t("SearchForEmployees")} 
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
            <EmployeeSearchActions searchValue={searchValue} businessName={businessName} businessID={businessID} />
         </Box>
         
      </VStack>
    </Flex>
  )
}

export default SearchEmployeesContent;