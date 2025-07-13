import { Field, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';

const CommercialTypeSelectBox = ({label ,Controller,control ,data, error,defaultValue}) => {
   
   const commercialTypesData = data.map(item => ({...item , value : item.title, title:item.title})) ;
   
   const {textSecondary} = useThemedColors();
   
   return (
      <Flex flexDirection={'column'}>
        <Field.Root>
           <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
        </Field.Root>
        <SelectBox 
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