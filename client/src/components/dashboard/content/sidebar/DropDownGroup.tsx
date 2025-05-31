import { Accordion, Flex, HStack, Span } from "@chakra-ui/react";
import useThemedColors from "../../../../hooks/useThemedColors";

const DropDownGroup = ({data}) => {
   const {textSecondary, textPrimary} = useThemedColors();
   return (
      <Accordion.Root multiple >
        {data.map((item, index) => (
         
          <Accordion.Item key={index} value={item.title} className="btn">
            
            <Accordion.ItemTrigger padding={0}>
              <Flex textWrap={'wrap'}  flex="1" className="btn">
               <Span color={textPrimary} className="text-[20px]">{item.title}</Span>
              </Flex>
              
            </Accordion.ItemTrigger>
            
            <Accordion.ItemContent >
              <Accordion.ItemBody padding={0} marginBottom={2}>
                  {
                     item.innerList && item.innerList.map((item , index)=>(
                        <HStack key={index} color={textSecondary} _hover={{paddingLeft:'3px'}} transition={'.2s ease-in-out'}>
                           <item.icon />
                           {<Span   className="text-[20px]">{item.title}</Span>}
                        </HStack>
                     ))
                  }
               </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
          
        ))}
      </Accordion.Root>
    )
}

export default DropDownGroup;

