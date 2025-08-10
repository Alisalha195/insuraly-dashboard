import { Box, Flex } from "@chakra-ui/react";
import useThemedColors from "../../../../../../hooks/useThemedColors";
// import SearchByNationalNumber from './search/SearchByNationalNumber';
// import SearchByInsuranceNumber from './search/SearchByInsuranceNumber';
// import SearchByName from './search/searchByName';

const BusinessSearchActions = ({ searchValue }) => {
  const { btnSecondary, btnGreen } = useThemedColors();
  return (
    <Box>
      <Flex justifyContent={"space-around"}>
        {/* <SearchByNationalNumber searchValue={searchValue} />
        <SearchByName searchValue={searchValue} />
        <SearchByInsuranceNumber searchValue={searchValue} /> */}
      </Flex>
    </Box>
  );
};

export default BusinessSearchActions;
