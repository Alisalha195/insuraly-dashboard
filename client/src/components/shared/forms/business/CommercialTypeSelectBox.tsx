import { Field, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';
import { useTranslation } from 'react-i18next';

const CommercialTypeSelectBox = ({label ,Controller,control ,data, error,defaultValue}) => {
   
   const commercialTypesData = data.map(item => ({...item , value : item.title, title:item.title})) ;
   // console.log("commercialTypesData in CommercialTypeSelectBox :", commercialTypesData)
   const {textSecondary} = useThemedColors();
   const {t} =  useTranslation();
   
   return (
      <Flex flexDirection={'column'}>
        <Field.Root>
           <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{t(label)}</Field.Label>
        </Field.Root>
        <SelectBox 
           name={"commercialType"}
           disabled={false}
           defaultValue={commercialTypesData[0].value}
           data={commercialTypesData}
           Controller={Controller}
           control={control}
           error={error}
        />
      </Flex>
    )
}

export default CommercialTypeSelectBox