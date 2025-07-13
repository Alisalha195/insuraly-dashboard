import { Box, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import FieldGroup from './FieldGroup'
import useThemedColors from '../../../hooks/useThemedColors';
import useBusinessOwnerStore from '../../../store/useAddBusinessOwnerStore';
//birth_registration_place
const BirthRegistrationFields = ({register,errors}) => {
   const {textPrimary, textSecondary, titleTextSecondary} = useThemedColors();
   // const { dataObject, setRegistrationPlace, setRegistrationDigit} = data;
  return (
   <Box  padding={1} marginY={2}>
      <Text marginBottom={1} color={titleTextSecondary}>Birth Registration</Text>
      <Grid  className=' ' templateColumns={{  mdTo2xl:"repeat(2, 1fr)"}}   padding={2} gap={2}>
         <FieldGroup 
            onchangeValue={null}
            register={register}
            name={'registrationLocation'}
            type={"text"}
            invalid = {false} 
            label = "location" 
            placeholder = ""
            error = {errors.registrationLocation}
            preInputText={null}
         />
         
         <FieldGroup 
            onchangeValue={null}
            register={register}
            name={'registrationDigit'}
            type={"text"}
            invalid = {false} 
            label = "digit" 
            placeholder = ""
            error = {errors.registrationDigit}
            preInputText={null}
         />
         
      </Grid>
   </Box>
  )
}

export default BirthRegistrationFields