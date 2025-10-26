import { Field, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import useThemedColors from "../../../hooks/useThemedColors";
import { useState } from "react";
import { set } from "react-hook-form";

const LimitedFieldGroup = ({
   name,
   type,
   preInputText,
   invalid,
   label,
   placeholder,
   error,
   onchangeValue,
   Controller,
   control,
   limit,
}) => {
   const { textSecondary, textError, textInput } = useThemedColors();
   //   const [invalid2, setInvalid2] = useState(false);

   return (
      <Field.Root invalid={invalid}>
         <Field.Label fontSize={{ xssToXs: "14px", xsToXm: "15px", xmToSm: "16px", smToMd: "18px", mdTo3xl: "20px" }} color={textSecondary}>
            {label}
         </Field.Label>
         <Controller
            name={name}
            control={control}
            render={({ field }) => (
               <InputGroup startElement={preInputText ?? preInputText}>
                  <Input
                     type={type}
                     placeholder={placeholder}
                     {...field}
                     onChange={async (e) => {
                        if (onchangeValue) {
                           await onchangeValue(e.target.value);
                        }

                        if (e.target.value.length <= limit) {
                           const value =
                              e.target.value === "" ? null : Number(e.target.value);
                           field.onChange(value);
                        }
                     }}
                     fontSize={{ xssToXs: "14px", xsToXm: "15px", xmToSm: "16px", smToMd: "18px", mdTo3xl: "20px" }}
                     paddingY={1}
                     paddingX={2}
                     height={"auto"}
                     color={textInput}
                     ps={label == "phone number" ? "8ch" : ""}
                  />
               </InputGroup>
            )}
         />

         {error &&
            <Text
               fontSize={{ xssToXs: "13px", xsToXm: "14px", xmToSm: "15px", smToMd: "17px", mdTo3xl: "18px" }}
               color={textError}
            >
               {error.message}
            </Text>
         }
      </Field.Root>
   );
};

export default LimitedFieldGroup;
