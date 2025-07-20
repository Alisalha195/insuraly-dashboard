
// import { Box,Field,Text } from '@chakra-ui/react';
// import { useRef, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import useThemedColors from '../../../hooks/useThemedColors';

// const DatePickerField = ({label , value , setValue}) => {
   
//    const {textPrimary, textSecondary,inputBorder} = useThemedColors();
//    const [date , setDate] = useState(new Date());
   
//   return (
//       <Field.Root >
//          <Field.Label fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
//          <Box backgroundColor={'transparent'} border={`1px solid ${inputBorder}`} paddingY={1} paddingX={1} fontSize={'23px'} borderRadius={'7px'} outline={'none'} >
//             <DatePicker 
//                className='date-picker'
//                selected={value}
//                onChange={setValue}
//                showDateSelect
//                dateFormat="yyyy-MM-dd"
//             />
//          </Box>
//          {/* <Field.ErrorText>{error}</Field.ErrorText> */}
//       </Field.Root>
//   )
// }

// export default DatePickerField

import { Box,Field,Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useThemedColors from '../../../hooks/useThemedColors';
import { useForm } from 'react-hook-form';

const DatePickerField = ({register, label,Controller , control,error, name }) => {
   
   const {textPrimary, textSecondary,inputBorder} = useThemedColors();
   const [date , setDate] = useState(new Date());
   
   
  return (
      <Field.Root >
         <Field.Label fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
         <Box marginTop={"4px"}  className='btn' backgroundColor={'transparent'} border={`1px solid ${inputBorder}`} paddingY={"10px"} paddingX={1} fontSize={'23px'} borderRadius={'7px'} outline={'none'} >
            <Controller
               
               control = {control}
               name={name}
               render = {({field}) =>(
                  <DatePicker 
                     
                     className='date-picker btn'
                     selected={field.value}
                     onChange={(date) =>{
                        // if(date.length > 11)
                        field.onChange(date)
                     }}
                     showDateSelect
                     // readOnly={true}
                     // onKeyDown={(e)=>e.preventDefault()}
                     dateFormat="yyyy-MM-dd"
                  />
               )}
            
            />
         </Box>
            {error && <p className='text-[#f00]' >{error.message}</p>}
         {/* <Field.ErrorText>{error}</Field.ErrorText> */}
      </Field.Root>
  )
}

export default DatePickerField