import { Accordion, Box, Flex, HoverCard, HStack, Portal, Span, Text } from "@chakra-ui/react";
import useThemedColors from "../../../../hooks/useThemedColors";
import { useTranslation } from "react-i18next";
import { capitalize } from "../../../../lib/capitalize";
import useLangDir from "../../../../hooks/useLangDir";

const DropDownGroup = ({ data, collabsed }) => {
   const { textSecondary, textPrimary ,bgSecondary , bgPrimary, iconInSidebar } = useThemedColors();
   const {t} = useTranslation();
   const {dir} = useLangDir();
   if(collabsed) {
      return (
      <Flex marginTop={3} flexDirection={"column"} alignItems={"center"} gap={2}>
         {data.map((item, index) => (
         <HoverCard.Root size="sm" openDelay={100} closeDelay={100}  positioning={{ placement: "right" }}>
            <HoverCard.Trigger asChild>
               
            <Text className="btn" color={iconInSidebar}>
              <item.collapsidIcon color={textPrimary} />
            </Text>
              
            </HoverCard.Trigger>
            <Portal>
              <HoverCard.Positioner>
                <HoverCard.Content maxWidth="240px" padding={0}>
                  {/* <HoverCard.Arrow /> */}
                  <Box 
                     backgroundColor={bgSecondary}
                     paddingX={4}
                     paddingY={2}
                     borderRadius={4}
                     
                  >
                     
                  {item.innerList && item.innerList.map((innerItem, innerIndex) => (
                     <HStack
                        key={innerIndex}
                        color={textSecondary}
                        _hover={{ backgroundColor: bgPrimary }}
                        transition={'.2s ease-in-out'}
                        fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "14px", smTo3xl: "16px" }}
                        paddingTop={{ xmToSm: "4px" }}
                        overflow={'hidden'}
                        textWrap={'nowrap'}
                        textOverflow={"ellipsis"}
                        className="btn"
                        paddingX={2}
                        paddingY={1}
                        borderRadius={4}
                     >
                        <Span>
                          <innerItem.icon />
                        </Span>
                        <Span
                          overflow={'hidden'}
                          textWrap={'nowrap'}
                          textOverflow={"ellipsis"}
                        >
                          {t(innerItem.title)}
                        </Span>
                     </HStack>
                  ))}
                    
                  </Box>
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal>
         </HoverCard.Root>
         ))}
      </Flex>
      )
   }
   // if(!collabsed) {
   //    return (
   //        <Flex flexDirection={"column"} alignItems={"center"} gap={4}>
   //       {data.map((item, index) => (
   //          <Box key={index} position="relative" onMouseEnter={(e) => {
   //            const target = e.currentTarget.querySelector(".hidden-box");
   //            if (target) {
   //           target.style.display = "block";
   //            }
   //          }} onMouseLeave={(e) => {
   //            const target = e.currentTarget.querySelector(".hidden-box");
   //            if (target) {
   //           target.style.display = "none";
   //            }
   //          }}>
   //            <Text className="btn">
   //              <item.collapsidIcon color={textPrimary} />
   //            </Text>
   //            <Box
   //           className="hidden-box"
   //           display="none"
   //           position="absolute"
   //           top="50%"
   //           left="100%"
   //           transform="translateY(-50%)"
   //           backgroundColor="white"
   //           boxShadow="md"
   //           padding={2}
   //           borderRadius="md"
   //           zIndex={1400}
   //           whiteSpace="nowrap"
   //            >
   //           {item.innerList && item.innerList.map((innerItem, innerIndex) => (
   //             <HStack
   //             key={innerIndex}
   //             color={textSecondary}
   //             _hover={{ paddingLeft: '3px' }}
   //             transition={'.2s ease-in-out'}
   //             fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "14px", smTo3xl: "16px" }}
   //             paddingTop={{ xmToSm: "4px" }}
   //             overflow={'hidden'}
   //             textWrap={'nowrap'}
   //             textOverflow={"ellipsis"}
   //             >
   //             <Span>
   //               <innerItem.icon />
   //             </Span>
   //             <Span
   //               overflow={'hidden'}
   //               textWrap={'nowrap'}
   //               textOverflow={"ellipsis"}
   //             >
   //               {innerItem.title}
   //             </Span>
   //             </HStack>
   //           ))}
   //            </Box>
   //          </Box>
   //       ))}
   //        </Flex>
   //    )
   // }
   else
   return (
      <Accordion.Root multiple >
         {data.map((item, index) => (

            <Accordion.Item key={index} value={item.title} className="btn" >

               <Accordion.ItemTrigger padding={0}>
                  <Flex flex="1" className="btn" marginBottom={2} width={'100%'} dir={dir}>
                     
                     <Span color={textSecondary} width={'100%'} 
                        // className="text-[20px]"
                        fontSize={{ xssToXs: "12px", xsToXm: "15px", xmToMd: "16px",  mdTo2xl: "17px" }}
                        textOverflow={"ellipsis"}
                        overflow={'hidden'}
                        textWrap={'nowrap'}
                        
                     >
                        {capitalize(t(item.title))}
                     </Span>
                     
                     
                  </Flex>

               </Accordion.ItemTrigger>

               <Accordion.ItemContent >
                  <Accordion.ItemBody padding={0} marginBottom={2} 
                  className={item.classList} 
                  >
                     
                     {
                        item.innerList && item.innerList.map((item, index) => (
                           <HStack
                              key={index}
                              color={textSecondary}
                              _hover={{ ps: '3px' }}
                              transition={'.2s ease-in-out'}
                              fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "14px", smTo3xl: "16px" }}
                              paddingTop={{ xmToSm: "4px" }}
                              // maxWidth={"100%"}
                              overflow={'hidden'}
                              textWrap={'nowrap'}
                              textOverflow={"ellipsis"}
                              dir={dir}
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
                                 {t(item.title)}
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

