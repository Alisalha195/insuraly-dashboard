import { Field, Flex } from '@chakra-ui/react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';

const StatusSelectBox = ({label ,Controller,control ,data, error,defaultValue,disabled}) => {
   
   const statusData = data.map(item => ({...item , value : item.status_title, title:item.status_title})) ;
   
   const {textSecondary} = useThemedColors();
   
  return (
    <Flex flexDirection={'column'}>
      <Field.Root>
         <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
      </Field.Root>
      <SelectBox 
         data={statusData}
         Controller={Controller}
         control={control}
         error={error}
         defaultValue={defaultValue}
         disabled={disabled}
      />
    </Flex>
  )
}

export default StatusSelectBox;