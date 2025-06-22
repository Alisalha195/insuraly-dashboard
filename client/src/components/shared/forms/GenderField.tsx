import { Box, Field, Flex, HStack, RadioGroup, Text, VStack } from "@chakra-ui/react";
import useThemedColors from "../../../hooks/useThemedColors";
import { useState } from "react";



const GenderField = ({register,Controller, control,error}) => {
   
   const [gender , setGender] = useState("1")
   const { textSecondary} = useThemedColors();
  return (
   <Flex  flexDirection={'column'}  justify={'space-between'}>
      
      <Text fontSize={'22px'} fontWeight={'500'} mdDown={{paddingBottom:'20px'}} color={textSecondary}>Gender</Text>
      <Controller 
         name="gender"
         defaultValue={"1"}
         control={control}
         render={({field}) => (
            <RadioGroup.Root {...field} 
            defaultValue={"1"}
            onValueChange={field.value} value={field.value}  size={'sm'}>
               <HStack gap="6" fontSize={'22px'}>

                  <RadioGroup.Item key={"1"}     value={"1"} className="btn">
                     <RadioGroup.ItemHiddenInput />
                     <RadioGroup.ItemIndicator className="btn" color={"#77f"} backgroundColor={"transparent"} />
                     <RadioGroup.ItemText fontSize={'20px'}>Male</RadioGroup.ItemText>
                  </RadioGroup.Item>

                  <RadioGroup.Item key={"0"}    value={"0"} className="btn">
                     <RadioGroup.ItemHiddenInput />
                     <RadioGroup.ItemIndicator className="btn" color={"#f88"} backgroundColor={"transparent"} />
                     <RadioGroup.ItemText fontSize={'20px'}>Female</RadioGroup.ItemText>
                  </RadioGroup.Item>
               </HStack>
            </RadioGroup.Root>
         )}
      />
      {error && <p className="text-[#f00]">{error.message}</p>}
      
   </Flex>
  )
}

export default GenderField