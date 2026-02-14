import { Field, Flex } from '@chakra-ui/react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';

const FisinshReasonsSelectBox = ({label ,Controller,control ,data, error,defaultValue,disabled}) => {
   
   const finishReasonsData = data.map(item => ({...item , value : item.reason, title:item.reason})) ;
   
   const {textSecondary} = useThemedColors();
   
  return (
    <Flex flexDirection={'column'}>
      <Field.Root>
         <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
      </Field.Root>
      <SelectBox 
         name={"finishReason"}
         data={finishReasonsData}
         Controller={Controller}
         control={control}
         error={error}
         defaultValue={defaultValue || finishReasonsData[0].value}
         disabled={disabled}
      />
    </Flex>
  )
}

export default FisinshReasonsSelectBox;