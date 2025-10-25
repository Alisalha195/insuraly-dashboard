import { Box, Field, Flex, Grid, Input, Text } from '@chakra-ui/react';

import FieldGroup from "./FieldGroup";
import useThemedColors from '../../../hooks/useThemedColors';
import DatePickerField from './DatePickerField';
import useBusinessOwnerStore from '../../../store/useAddBusinessOwnerStore';
import Control from './Control';

const BirthFields = ({ register, Controller, control, errors }) => {
   const { textPrimary, textSecondary, titleTextSecondary, borderSecondary } = useThemedColors();
   // const { dataObject, setBirthDate, setBirthLocation} = data;
   return (
      <Box padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}>
         <Text marginBottom={1} fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }} color={titleTextSecondary}>Birth</Text>
         <Grid className=' ' templateColumns={{ mdTo2xl: "repeat(2, 1fr)" }} padding={2} gap={2}>
            <FieldGroup
               onchangeValue={null}
               register={register}
               name={'birthLocation'}
               type={'text'}
               invalid={false}
               label="birth location"
               placeholder=""
               error={errors.birthLocation}
               preInputText={null}
            />


            <DatePickerField
               name={"birthDate"}
               register={register}
               label="birth date"
               Controller={Controller}
               control={control}
               error={errors.birthDate}
            />
         </Grid>
      </Box>
   )
}

export default BirthFields