import { Flex, Table, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import useThemedColors from "../../../../../../../hooks/useThemedColors";

const LogsTableBody = ({ data, search = false }) => {

   const navigate = useNavigate();
   const { tableItem,btnGreen, btnDanger } = useThemedColors();

   
   if (data && data?.length > 0) {

      return ( 
         <Table.Body>
            {data?.map((item, index) => (
               <Table.Row key={index} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>

                  <Table.Cell textAlign="start" textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.id}
                     </Text>
                  </Table.Cell>

                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.user_id?.email}
                     </Text>
                  </Table.Cell>

                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.action}
                     </Text>
                  </Table.Cell>
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.table_name}
                     </Text>
                  </Table.Cell>
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.record_id}
                     </Text>
                  </Table.Cell>      
                  
                  {/* <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.old_data}
                     </Text>
                  </Table.Cell> */}
                  
                  {/* <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.new_data}
                     </Text>
                  </Table.Cell>   */}
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.ip_address}
                     </Text>
                  </Table.Cell> 
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.user_agent}
                     </Text>
                  </Table.Cell>
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        { new Date(item.created_at).toLocaleString() }
                     </Text>
                  </Table.Cell>


                  {/*  <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                     <span
                        // className="[padding:4px_9px] "
                        onClick={() => navigate(`/profile/${item.personal_informations.personal_info_id}`)}
                        
                        fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}
                        
                      >
                        <Text color={tableItem} _hover={{color:"#6666ff"}} className="btn hover:[color:#6666ff] [padding:4px_9px] "  fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item.personal_informations.first_name}
                        </Text>
                        
                     </span>
                  </Table.Cell> */}

                  {
                     search
                        ?
                        <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                           <Flex gap={1}>
                              <Text 
                                 color={btnGreen}
                                 className="btn"
                              >
                                 <TiEdit />
                              </Text>
                              <Text 
                                 color={btnDanger}
                                 className="btn"
                              >
                                 <RiDeleteBin2Line />
                              </Text>
                           </Flex>
                        </Table.Cell>
                        :
                        <Table.Cell color={tableItem} fontSize={"20px"} textWrap={"nowrap"}>
                           {/* <BusinessOwnerTableActionsMenu itemId={item.business_owner_id} itemData={item} /> */}
                        </Table.Cell>
                  }
               </Table.Row>
            ))}
         </Table.Body>
      )
   }
}

export default LogsTableBody;