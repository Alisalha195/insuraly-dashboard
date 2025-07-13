import React, { useEffect } from 'react'
import FieldGroup from '../FieldGroup'
import { Grid, Box, Text } from '@chakra-ui/react'
import useThemedColors from '../../../../hooks/useThemedColors';
import DatePickerField from '../DatePickerField';
import StageSelectBox from './StageSelectBox';
import { getBusinessStages, getBusinessCommercialTypes,getBusinessStatuses } from '../../../../api/business/getBusinessRelatedData';
import CommercialTypeSelectBox from './CommercialTypeSelectBox';
import StatusSelectBox from './StatusSelectBox';

const BusinessGeneralFields = ({setContentLoaded, register, errors, Controller, control, onChangeBusinessOwner, businessOwnerName}) => {
   const {textPrimary, textSecondary,titleTextSecondary} = useThemedColors();
   
   const {stagesData , isSuccessStages} = getBusinessStages();
   const {commercialTypesData , isSuccessCommercialTypes} = getBusinessCommercialTypes();
   const {statusesData , isSuccessStatusesData} = getBusinessStatuses();
   // console.log("commercialTypesData",commercialTypesData);
   
   useEffect(()=>{
      if(isSuccessStages && isSuccessCommercialTypes && isSuccessStatusesData )
         setContentLoaded((prev) => ({...prev , businessGeneralFields : true}));
   },[isSuccessStages,isSuccessCommercialTypes,isSuccessStatusesData]);
  
  if(isSuccessStages && isSuccessCommercialTypes && isSuccessStatusesData ) {
   
     return (
      <Box  padding={1} marginY={2}>
            <Text marginBottom={1} color={titleTextSecondary}>General Info</Text>
            <Grid  className=' ' templateColumns={{  mdTo2xl:"repeat(2, 1fr)"}}   padding={2} gap={2}>
              
               <FieldGroup 
                  register = {register}
                  name={'businessName'}
                  type={'text'}
                  invalid = {false} 
                  label = "business name" 
                  placeholder = ""
                  error = {errors.businessName}
                  preInputText={null}
                  onchangeValue={null}
               />
               
               <FieldGroup 
                  register = {register}
                  name={'bOwnerInsuranceNumber'}
                  type={'number'}
                  invalid = {false} 
                  label = "business owner insurance number" 
                  placeholder = ""
                  error = {errors.bOwnerInsuranceNumber}
                  preInputText={null}
                  onchangeValue={onChangeBusinessOwner}
                  
               />
               
               <CommercialTypeSelectBox 
                  data={commercialTypesData}
                  label="commercial type" 
                  Controller={Controller}
                  control={control}
                  error={errors.commercialType}
                  defaultValue={"public sector institute"}
               />
               
               <StageSelectBox 
                  data={stagesData}
                  label="stage" 
                  Controller={Controller}
                  control={control}
                  error={errors.stage}
                  defaultValue={"1"}
                  disabled={false}
               />
               
               <StatusSelectBox 
                  data={statusesData}
                  label="status" 
                  Controller={Controller}
                  control={control}
                  error={errors.status}
                  defaultValue={"active"}
                  disabled={false}
               />
               
               <DatePickerField 
                 name={"lawInitiativeDate"}
                 register={register}
                 label="law initiative date" 
                 Controller={Controller}
                 control={control}
                 error={errors.lawInitiativeDate}
               />
               
            </Grid>
         </Box>
    )
   }
}

export default BusinessGeneralFields