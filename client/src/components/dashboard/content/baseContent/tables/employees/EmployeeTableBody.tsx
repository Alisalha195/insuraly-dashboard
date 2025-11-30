import { Flex, Table, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import useThemedColors from '../../../../../../hooks/useThemedColors';
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";

const EmployeeTableBody = ({ data, search = false }) => {

   
   const navigate = useNavigate();
   const { tableItem,btnGreen, btnDanger } = useThemedColors();

   if (data && data?.length > 0) {

      return ( 
         <Table.Body>
            {data?.map((item, index) => (
               <Table.Row key={index} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>

                  <Table.Cell textAlign="start" textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item.employee_id}
                        {/* Employee ID */}
                     </Text>
                  </Table.Cell>

                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item.Employees.personal_informations.insurance_number}
                     </Text>
                  </Table.Cell>

                  <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                     <span
                        // className="[padding:4px_9px] "
                        onClick={() => navigate(`/dashboard/business-owners/${item.business_owner_id}`)}
                        
                        fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}
                        
                      >
                        <Text color={tableItem} _hover={{color:"#6666ff"}} className="btn hover:[color:#6666ff] [padding:4px_9px] "  fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                           {item.Employees.personal_informations.first_name}
                        </Text>
                        
                     </span>
                  </Table.Cell>
                  <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item.Employees.personal_informations.last_name}
                        
                     </Text>
                     
                  </Table.Cell>

                  <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item.Employees.personal_informations.national_number}
                        
                     </Text>
                     
                  </Table.Cell>
                  <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item.Employees.personal_informations.email}
                        
                     </Text>
                     
                  </Table.Cell>


                  {/* {
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
                           <BusinessOwnerTableActionsMenu itemId={item.business_owner_id} itemData={item} />
                        </Table.Cell>
                  } */}
               </Table.Row>
            ))}
         </Table.Body>
      )
   } else {
      <Text>No Data</Text>
   }
}

export default EmployeeTableBody;