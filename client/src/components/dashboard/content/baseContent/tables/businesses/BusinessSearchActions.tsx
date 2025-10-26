import { Box, Flex } from "@chakra-ui/react";
import SearchByInsuranceNumber from './search/SearchByInsranceNumber';
import SearchByName from './search/SearchByName';

const BusinessSearchActions = ({ searchValue }) => {
   //   const { btnSecondary, btnGreen } = useThemedColors();
   return (
      <Box>
         <Flex alignItems={{ xssToXmm: "center" }} flexDirection={{ xssToXmm: "column" }} justifyContent={{ xssToXm: "space-between", xmTo2xl: 'space-around' }}>
            <SearchByName searchValue={searchValue} />
            <SearchByInsuranceNumber searchValue={searchValue} />
         </Flex>
      </Box>
   );
};

export default BusinessSearchActions;
