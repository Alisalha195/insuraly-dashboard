import { Box, Field, Flex, Grid, Input, Text } from '@chakra-ui/react';

import FieldGroup from "./FieldGroup";
import useThemedColors from '../../../hooks/useThemedColors';
import DatePickerField from './DatePickerField';
import useBusinessOwnerStore from '../../../store/useAddBusinessOwnerStore';
import Control from './Control';

const BirthFields = ({register, Controller, control,errors}) => {
   const {textPrimary, textSecondary, titleTextSecondary} = useThemedColors();
   // const { dataObject, setBirthDate, setBirthLocation} = data;
   return (
    <Box  padding={1} marginY={2}>
       <Text marginBottom={1} color={titleTextSecondary}>Birth</Text>
       <Grid  className=' ' templateColumns={{  mdTo2xl:"repeat(2, 1fr)"}}   padding={2} gap={2}>
          <FieldGroup 
            //  type={"text"}
            //  invalid = {false} 
            //  label = "birth location" 
            //  placeholder = ""
            //  error = "wrong email"
            //  value={dataObject.birthLocation}
            //  setValue={setBirthLocation}
             
            register = {register}
            name={'birthLocation'}
            type={'text'}
            invalid = {false} 
            label = "birth location" 
            placeholder = ""
            error={errors.birthLocation}
            preInputText={null}
          />
          
          <DatePickerField 
             register={register}
             label="birth date" 
             Controller={Controller}
             control={control}
             error={errors.birthDate}
            //  value={dataObject.birthDate}
            //  setValue={setBirthDate}
          />
       </Grid>
    </Box>
  )
}

export default BirthFields