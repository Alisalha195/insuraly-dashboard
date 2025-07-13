
import { Box, Grid, Text } from "@chakra-ui/react";
import { getCities, getCountriesWithFlags } from "../../../../api/business/getBusinessRelatedData"
import CountrySelectBox from "./CountrySelectBox";
import useThemedColors from "../../../../hooks/useThemedColors";
import CitySelectBox from "./CitySelectBox";
import { useEffect } from "react";
const AddressFields = ({setContentLoaded , errors, Controller, control}) => {
   
   const {countries , isSuccessCountries} = getCountriesWithFlags();
   const {cities , isSuccessCities} = getCities("Syria");
   const {textPrimary, textSecondary,titleTextSecondary} = useThemedColors();
   
   // console.log("cities ::",cities)
   // console.log("getCountriesWithFlags",countries?.data)
   
   useEffect(()=>{
      if((isSuccessCountries && countries) && (isSuccessCities && cities))
         setContentLoaded((prev) => ({...prev , addressFields : true}));
   },[isSuccessCountries,isSuccessCities]);
   
   
  if((isSuccessCountries && countries) && (isSuccessCities && cities)) {
   
     return (
       <Box  padding={1} marginY={2}>
                   <Text marginBottom={1} color={titleTextSecondary}>General Info</Text>
                   <Grid className=' ' templateColumns={{  mdTo2xl:"repeat(2, 1fr)"}}   padding={2} gap={2}>
                      
                     <CountrySelectBox 
                        data={countries.data}
                        label="country" 
                        Controller={Controller}
                        control={control}
                        error={errors.country}
                     />
                     
                      <CitySelectBox
                        data={cities.data.states}
                        label="State" 
                        Controller={Controller}
                        control={control}
                        error={errors.city}
                      
                      />
                      
                   </Grid>
                </Box>
     )
   }
}

export default AddressFields
