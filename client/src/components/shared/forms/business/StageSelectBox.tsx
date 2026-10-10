import { Field, Flex } from '@chakra-ui/react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';
import { useTranslation } from 'react-i18next';

const StageSelectBox = ({label ,Controller,control ,data, error, defaultValue,disabled}) => {
   
   const stagesData = data.map(item => ({...item , value : item.stage_Digit, title:item.stage_Digit})) ;
   
   const {textSecondary} = useThemedColors();
   const {t} =  useTranslation();
   
  return (
    <Flex flexDirection={'column'}>
      <Field.Root>
         <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{t(label)}</Field.Label>
      </Field.Root>
      <SelectBox 
         name={"stage"}
         disabled={disabled}
         defaultValue={defaultValue || stagesData[0].value}
         data={stagesData}
         Controller={Controller}
         control={control}
         error={error}
      />
    </Flex>
  )
}

export default StageSelectBox