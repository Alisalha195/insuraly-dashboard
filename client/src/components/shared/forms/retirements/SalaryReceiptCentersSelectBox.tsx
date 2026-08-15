import { Field, Flex } from '@chakra-ui/react'
import SelectBox from '../SelectBox'
import useThemedColors from '../../../../hooks/useThemedColors';

const SalaryReceiptCentersSelectBox = ({label ,Controller,control ,data, error,disabled, defaultValue}) => {
   const receiptCentersData = data.map(item => ({...item , value : item.center_name, title:item.center_name})) ;

   const {textSecondary} = useThemedColors();
   
  return (
    <Flex flexDirection={'column'}>
      <Field.Root>
         <Field.Label paddingBottom={2} fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
      </Field.Root>
      <SelectBox 
         name={"salaryReceiptCenter"}
         data={receiptCentersData}
         Controller={Controller}
         control={control}
         error={error}
         defaultValue={defaultValue || receiptCentersData[0].value}
         disabled={disabled}
      />
    </Flex>
  )
}

export default SalaryReceiptCentersSelectBox;