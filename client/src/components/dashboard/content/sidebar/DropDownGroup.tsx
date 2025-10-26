import { Accordion, Flex, HStack, Span } from "@chakra-ui/react";
import useThemedColors from "../../../../hooks/useThemedColors";

const DropDownGroup = ({ data }) => {
   const { textSecondary, textPrimary } = useThemedColors();
   return (
      <Accordion.Root multiple >
         {data.map((item, index) => (

            <Accordion.Item key={index} value={item.title} className="btn">

               <Accordion.ItemTrigger padding={0}>
                  <Flex flex="1" className="btn" marginBottom={2}>
                     <Span color={textSecondary}
                        // className="text-[20px]"
                        fontSize={{ xssToXs: "12px", xsToXm: "16px", xmToSm: "18px", smToMd: "20px", mdTo2xl: "22px" }}
                     >
                        {item.title}
                     </Span>
                  </Flex>

               </Accordion.ItemTrigger>

               <Accordion.ItemContent >
                  <Accordion.ItemBody padding={0} marginBottom={2}>
                     {
                        item.innerList && item.innerList.map((item, index) => (
                           <HStack
                              key={index}
                              color={textSecondary}
                              _hover={{ paddingLeft: '3px' }}
                              transition={'.2s ease-in-out'}
                              fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px", smTo2xl: "20px" }}
                              paddingTop={{ xmToSm: "4px" }}
                           >
                              <item.icon />
                              {
                                 <Span>
                                    {item.title}
                                 </Span>
                              }
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

