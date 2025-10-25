
import { Field, Flex, Input, InputGroup, Text } from '@chakra-ui/react';
import useThemedColors from '../../../hooks/useThemedColors';
import { useState } from 'react';
import { set } from 'react-hook-form';

const FieldGroup = ({ register, name, type, preInputText, invalid, label, placeholder, error, onchangeValue }) => {

   const { textSecondary, textError, textInput } = useThemedColors();
   ;
   return (
      <Field.Root invalid={invalid} >
         <Field.Label fontSize={{ xssToXs: "14px", xsToXm: "15px", xmToSm: "16px", smToMd: "18px", mdTo3xl: "20px" }} color={textSecondary}>{label}</Field.Label>

         <InputGroup startElement={preInputText ?? preInputText}>
            <Input type={type}
               placeholder={placeholder}

               {...register(name, {
                  valueAsNumber: type == 'number' ? true : false,
                  onchange: async (e) => {
                     e.preventDefaults()
                     if (onchangeValue) {
                        await onchangeValue(e.target.value);
                     }
                  },
               })}

               fontSize={{ xssToXs: "14px", xsToXm: "15px", xmToSm: "16px", smToMd: "18px", mdTo3xl: "20px" }}
               paddingY={1}
               paddingX={2}
               height={'auto'}
               color={textInput}

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
         {error &&
            <Text
               fontSize={{ xssToXs: "13px", xsToXm: "14px", xmToSm: "15px", smToMd: "17px", mdTo3xl: "18px" }}
               color={textError}
            >
               {error.message}
            </Text>
         }
      </Field.Root>
   )
}

export default FieldGroup