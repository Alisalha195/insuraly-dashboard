
import { Box, Button, Field, Flex, Grid, Input, Text } from '@chakra-ui/react';

import FieldGroup from "./FieldGroup";
import useThemedColors from '../../../hooks/useThemedColors';
import GenderField from './GenderField';
import useBusinessOwnerStore from '../../../store/useAddBusinessOwnerStore';
import { useForm } from 'react-hook-form';
import LimitedFieldGroup from './LimitedFieldGroup';
import { nationalNumberLimit } from '../../../constants/forms';

const BasicFieldsSection = ({ register, Controller, control, errors }) => {
   const { textPrimary, textSecondary, titleTextSecondary, borderSecondary } = useThemedColors();

   return (
      <Box padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}>
         <Text marginBottom={1} color={titleTextSecondary}
            fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
         >
            Full Name
         </Text>
         <Grid className=' ' templateColumns={{ mdTo3xl: "repeat(2, 1fr)" }} padding={2} gap={2}>
            <FieldGroup
               onchangeValue={null}
               register={register}
               name={'firstName'}
               type={'text'}
               invalid={false}
               label="first name"
               placeholder=""
               error={errors.firstName}
               preInputText={null}
            />
            <FieldGroup
               onchangeValue={null}
               register={register}
               name={'lastName'}
               type={'text'}
               invalid={false}
               label="last name"
               placeholder=""
               error={errors.lastName}
               preInputText={null}
            />
            <FieldGroup
               onchangeValue={null}
               register={register}
               name={'fatherName'}
               type={'text'}
               invalid={false}
               label="father"
               placeholder=""
               error={errors.fatherName}
               preInputText={null}
            />
            <FieldGroup
               onchangeValue={null}
               register={register}
               name={'motherName'}
               type={'text'}
               invalid={false}
               label="mother"
               placeholder=""
               error={errors.motherName}
               preInputText={null}
            />
            <LimitedFieldGroup
               Controller={Controller}
               control={control}
               onchangeValue={null}
               name={'nationalNumber'}
               type={'number'}
               invalid={false}
               label="national number"
               placeholder=""
               error={errors.nationalNumber}
               preInputText={null}
               limit={nationalNumberLimit}
            />

            <GenderField
               register={register}
               Controller={Controller}
               control={control}
               error={errors.gender}
            />
         </Grid>
      </Box>

   )
}

export default BasicFieldsSection;