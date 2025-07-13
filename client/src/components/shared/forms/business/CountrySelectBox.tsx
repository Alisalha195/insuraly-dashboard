import { Field, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';
const CountrySelectBox = ({label ,Controller,control ,data, error}) => {
   
   const countriesDataShort = [data[0], data[1]]
   const countriesData = countriesDataShort.map(item => ({...item , value : item.name, title:item.name})) ;
   // console.log('after countriesDataShort :',countriesDataShort)
      const {textSecondary} = useThemedColors();
      return (
         <Flex flexDirection={'column'}>
           <Field.Root>
              <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
           </Field.Root>
           <SelectBox 
              disabled={true}
              data={countriesData}
              Controller={Controller}
              control={control}
              error={error}
              defaultValue={'Syria'}
           />
         </Flex>
       )
}

export default CountrySelectBox