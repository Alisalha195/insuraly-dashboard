
import { Field, Flex, Input, InputGroup } from '@chakra-ui/react';
import useThemedColors from '../../../hooks/useThemedColors';
import { useState } from 'react';
import { set } from 'react-hook-form';

const FieldGroup = ({ register, name, type ,preInputText  ,invalid, label , placeholder , error, onchangeValue}) => {
   
  const { textSecondary} = useThemedColors();
  const[invalid2 , setInvalid2] = useState(false)
  
  return (
   <Field.Root invalid =  {invalid} >
      <Field.Label fontSize={'22px'} color={textSecondary}>{label}</Field.Label>
      <InputGroup startElement ={preInputText ?? preInputText}>
         <Input type={type} 
               placeholder={placeholder} 
               
               {...register(name, {
                  valueAsNumber : type == 'number' ? true : false ,                  
                  onchange : async(e) => {
                     e.preventDefaults()
                     if(onchangeValue) {
                        await onchangeValue(e.target.value);
                     }
                  },
               })} 
               
               fontSize={'20px'} 
               paddingY={1} 
               paddingX={2} 
               height={'auto'} 
               color={textSecondary}   
               
               // onChange={(e)=>{
               //     if(name == "nationalNumber") {
               //        e.target.value.length > 11 && (e.target.value = e.target.value.slice(0,11)) 
               //     } else if(name == "phoneNumber") {
               //       e.target.value.length > 9 && (e.target.value = e.target.value.slice(0,9)) 
               //     }

               // }}
               
               ps={(label == "phone number") ? "8ch" : ''}
         />
         </InputGroup>
         {error && <p className='text-[18px] text-[#f00]' >{error.message}</p>}
      <Field.ErrorText>{error}</Field.ErrorText>
   </Field.Root>
  )
}

export default FieldGroup