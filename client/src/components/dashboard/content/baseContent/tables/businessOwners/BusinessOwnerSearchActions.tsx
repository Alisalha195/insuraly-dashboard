import { Box, Flex } from '@chakra-ui/react'
import SearchByNationalNumber from './search/SearchByNationalNumber';
import SearchByInsuranceNumber from './search/SearchByInsuranceNumber';
import SearchByName from './search/searchByName';

const BusinessOwnerSearchActions = ({ searchValue }) => {

   return (
      <Box>
         <Flex alignItems={{ xssToXmm: "center" }} flexDirection={{ xssToXmm: "column" }} justifyContent={{ xssToXm: "space-between", xmTo2xl: 'space-around' }}>

            <SearchByNationalNumber searchValue={searchValue} />
            <SearchByName searchValue={searchValue} />
            <SearchByInsuranceNumber searchValue={searchValue} />
         </Flex>
      </Box>
   )
}

export default BusinessOwnerSearchActions;