import { useEffect, useRef, useState } from "react";
import useThemedColors from "../../../../../hooks/useThemedColors";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import BackArrow from "../../../../../components/shared/BackArrow";
import SearchBox from "../../../../../components/shared/header/SearchBox";
import MonthlyClaimsSearchActions from "../../../../../components/dashboard/content/baseContent/tables/claims/monthly/MonthlyClaimsSearchActions";
import { useLocation } from "react-router-dom";

const SearchMonthlyClaimsPageContent = () => {
   
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
                 <MonthlyClaimsSearchActions searchValue={searchValue} month={month} />
              </Box>
              
           </VStack>
         </Flex>
      )
}

export default SearchMonthlyClaimsPageContent;