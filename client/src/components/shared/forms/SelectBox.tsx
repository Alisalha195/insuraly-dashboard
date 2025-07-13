import { Avatar, Box, Field, Portal, Select,createListCollection } from '@chakra-ui/react'
import React from 'react'

const SelectBox = ({Controller,control ,data, error,disabled, defaultValue}) => {
   const collectionData = createListCollection({items:data})
   // console.log("collectionData",collectionData)
  return (
    <Box>
      <Field.Root invalid={!!error} >
          
          <Controller
            control={control}
            name="stages"
            render={({ field }) => (
              <Select.Root
                {...field}
                disabled = {disabled}
                size={'xs'}
                name={field.name}
                value={field.item}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                defaultValue={defaultValue}
                collection={collectionData}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText  placeholder={defaultValue ?? "select"} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content 
                       maxHeight={"200px"}
                       overflowY={'scroll'}
                    >
                      {collectionData.items?.map((item, index) => (
                        <Select.Item item={item} key={index} justifyContent="flex-start">
                           
                           { item.flag &&
                              <Avatar.Root shape={'full'} size="2xs">
                               <Avatar.Image src={item.flag} alt={item.title} />
                               <Avatar.Fallback name={item.title} />
                             </Avatar.Root>
                           }
                          
                          {item.title}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
          <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    </Box>
  )
}

export default SelectBox