import { useNavigate } from "react-router-dom";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { Flex, Table, Text } from "@chakra-ui/react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import MonthlyClaimsTableActionsMenu from "./MonthlyClaimsTableActionsMenu";
import TableCell from "../../../../../../shared/tables/TableCell";

const MonthlyClaimsTableBody = ({data, search=false}:{data:any[], search?:boolean}) => {
   
   const navigate = useNavigate();
   const { tableItem,btnGreen, btnDanger } = useThemedColors();
  
      // if (data && data?.length > 0) {
   
         return ( 
            <Table.Body>
               {data?.map((item, index) => (
                  <Table.Row key={index} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
   
                     <TableCell>
                        <span
                           // className="[padding:4px_9px] "
                           onClick={() => navigate(`/dashboard/businesses/${item?.Service_Subscribtion?.Services?.Business_Employee?.Businesses?.business_id}`)}
                           
                           fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}
                           
                         >
                           <Text color={tableItem} _hover={{color:"#6666ff"}} className="btn hover:[color:#6666ff] [padding:4px_9px] "  fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                              {item?.Service_Subscribtion?.Services?.Business_Employee?.Businesses?.business_name}
                           </Text>
                           
                        </span>
                     </TableCell>
   
                     <TableCell>
                        <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item?.Service_Subscribtion?.Services?.Business_Employee?.Businesses?.insurance_number}
                        </Text>
                     </TableCell>
   
                     <TableCell>
                        <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item?.Service_Subscribtion?.Services?.Business_Employee?.Businesses?.employees_count}
                        </Text>
                        
                     </TableCell>
   
                     <TableCell>
                        <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item?.Service_Subscribtion?.employee_share + item?.Service_Subscribtion?.owner_share }
                        </Text>
                        
                     </TableCell>
                     <TableCell>
                        <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item?.fine}
                        </Text>
                        
                     </TableCell> 
                     <TableCell>
                        <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item?.Service_Subscribtion?.employee_share + item?.Service_Subscribtion?.owner_share + item?.fine}
                        </Text>
                     </TableCell>
                     <TableCell>
                        <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item?.delivered ? "done" : "pending"}
                        </Text>
                     </TableCell>
   
                     {
                        search
                           ?
                           <TableCell>
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
                           </TableCell>
                           :
                           <TableCell fontSize={"20px"} color={tableItem}  textWrap={"nowrap"}>
                              {/* <MonthlyClaimsTableActionsMenu itemId={item.cliam_id} itemData={item} /> */}
                           </TableCell>
                     }
                  </Table.Row>
               ))}
            </Table.Body>
         )
      // }
}

export default MonthlyClaimsTableBody