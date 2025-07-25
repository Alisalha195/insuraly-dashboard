import { Box, Field, Flex, Grid, Input, Text } from '@chakra-ui/react';

import FieldGroup from "./FieldGroup";
import useThemedColors from '../../../hooks/useThemedColors';
import DatePickerField from './DatePickerField';
import PhoneNumberField from './PhoneNumberField';
import EmailField from './EmailField';

const ContactFields = ({register,errors, Controller, control}) => {
   
   // const {dataObject, setPhoneNumber, setEmail} = data
   const {textPrimary, textSecondary, titleTextSecondary} = useThemedColors();
   
  return (
    <Box  padding={1} marginY={2}>
           <Text marginBottom={1} color={titleTextSecondary}>Contact</Text>
           <Grid  className=' ' templateColumns={{  mdTo2xl:"repeat(2, 1fr)"}}   padding={2} gap={2}>
              <PhoneNumberField 
                 error={errors.phoneNumber}
                 Controller={Controller}
                 control={control}
              />
              <EmailField 
                 register={register}
                 error={errors.email}
              />
           </Grid>
        </Box>
  )
}

export default ContactFields