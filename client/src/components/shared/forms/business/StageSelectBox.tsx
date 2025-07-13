import { Field, Flex } from '@chakra-ui/react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';

const StageSelectBox = ({label ,Controller,control ,data, error, defaultValue,disabled}) => {
   
   const stagesData = data.map(item => ({...item , value : item.stage_Digit, title:item.stage_Digit})) ;
   
   const {textSecondary} = useThemedColors();
   
  return (
    <Flex flexDirection={'column'}>
      <Field.Root>
         <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
      </Field.Root>
      <SelectBox 
         disabled={disabled}
         defaultValue={stagesData[0].value}
         data={stagesData}
         Controller={Controller}
         control={control}
         error={error}
      />
    </Flex>
  )
}

export default StageSelectBox