

import { Box, Field, Text, Input } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useThemedColors from '../../../hooks/useThemedColors';
import { useForm } from 'react-hook-form';

const DatePickerField = ({ register, label, Controller, control, error, name }) => {

   const { textPrimary, textSecondary, inputBorder, textError } = useThemedColors();
   const [date, setDate] = useState(new Date());


   return (
      <Field.Root >
         <Field.Label fontSize={{ xssToXs: "14px", xsToXm: "15px", xmToSm: "16px", smToMd: "18px", mdTo3xl: "20px" }} color={textSecondary}>{label}</Field.Label>
         <Box className='btn'>
            <Controller
               className='btn'
               control={control}
               name={name}
               render={({ field }) => (
                  <DatePicker
                     className='date-picker btn'
                     selected={field.value}
                     open={false}
                     onChange={(date) => {
                        field.onChange(date)
                     }}
                     showDateSelect
                     isClearable={false}
                     dateFormat="yyyy-MM-dd"
                     // readOnly={true}
                     customInput={
                        <Input
                           {...field}
                           _hover={{ cursor: 'pointer' }}
                           type='date'
                           cursor={'pointer'}
                           fontSize={{ xssToXs: "14px", xsToXm: "15px", xmToSm: "16px", smToMd: "18px", mdTo3xl: "20px" }}
                           paddingY={1}
                           paddingX={2}
                           height={'auto'}
                           color={textSecondary}
                           _selected={field.value}

                           className='btn'
                           value={field.value}

                           onChange={(date) => {

                              field.onChange(date)
                           }}
                        />
                     }
                  />
               )}
            />

         </Box>
         {error &&
            <Text
               fontSize={{ xssToXs: "13px", xsToXm: "14px", xmToSm: "15px", smToMd: "17px", mdTo3xl: "18px" }}
               color={textError}
            >
               {error.message}
            </Text>
         }
         {/* <Field.ErrorText>{error}</Field.ErrorText> */}
      </Field.Root>
   )
}

export default DatePickerField