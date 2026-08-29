import { Field, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';
import { useTranslation } from 'react-i18next';
const CitySelectBox = ({label ,Controller,control ,data, error}) => {
   
   const citiesData = data.map(item => ({...item , value : item.name, title:item.name})) ;
      
   // console.log('after changing :',citiesData)
      const {textSecondary} = useThemedColors();
      const {t} = useTranslation();
      
      return (
         <Flex flexDirection={'column'}>
           <Field.Root>
              <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{t(label)}</Field.Label>
           </Field.Root>
           <SelectBox 
              name={"city"}
              disabled={true}
              data={citiesData}
              Controller={Controller}
              control={control}
              error={error}
              defaultValue={'Latakia Governorate'}
           />
         </Flex>
       )
}

export default CitySelectBox;