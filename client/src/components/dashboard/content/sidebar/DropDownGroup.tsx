import { Accordion, Flex, HStack, Span } from "@chakra-ui/react";
import useThemedColors from "../../../../hooks/useThemedColors";

const DropDownGroup = ({ data }) => {
   const { textSecondary, textPrimary } = useThemedColors();
   return (
      <Accordion.Root multiple >
         {data.map((item, index) => (

            <Accordion.Item key={index} value={item.title} className="btn" >

               <Accordion.ItemTrigger padding={0}>
                  <Flex flex="1" className="btn" marginBottom={2} width={'100%'}>
                     <Span color={textSecondary} width={'100%'}
                        // className="text-[20px]"
                        fontSize={{ xssToXs: "12px", xsToXm: "15px", xmToMd: "16px",  mdTo2xl: "17px" }}
                        textOverflow={"ellipsis"}
                        overflow={'hidden'}
                        textWrap={'nowrap'}
                        
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
                              fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "14px", smTo3xl: "16px" }}
                              paddingTop={{ xmToSm: "4px" }}
                              // maxWidth={"100%"}
                              overflow={'hidden'}
                              textWrap={'nowrap'}
                              textOverflow={"ellipsis"}
                              
                           >
                              <Span
                                 //  fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "13px", smTo3xl: "15px" }}
                              >
                                 <item.icon />
                              </Span>
                              
                              <Span 
                                 overflow={'hidden'}
                                 textWrap={'nowrap'}
                                 textOverflow={"ellipsis"}
                              >
                                 {item.title}
                              </Span>
                              
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

