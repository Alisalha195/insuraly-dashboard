import { Field, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';
const CitySelectBox = ({label ,Controller,control ,data, error}) => {
   
   const citiesData = data.map(item => ({...item , value : item.name, title:item.name})) ;
      
   // console.log('after changing :',citiesData)
      const {textSecondary} = useThemedColors();
      return (
         <Flex flexDirection={'column'}>
           <Field.Root>
              <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
           </Field.Root>
           <SelectBox 
              disabled={false}
              data={citiesData}
              Controller={Controller}
              control={control}
              error={error}
              defaultValue={'Damascus Governorate'}
           />
         </Flex>
       )
}

export default CitySelectBox;