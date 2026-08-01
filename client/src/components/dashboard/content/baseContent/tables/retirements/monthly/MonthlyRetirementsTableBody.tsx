import React from 'react'
import { useNavigate } from 'react-router-dom';
import useThemedColors from '../../../../../../../hooks/useThemedColors';
import { Table, Text } from '@chakra-ui/react';

const MonthlyRetirementsTableBody = ({data, search = false, }) => {
   
   const navigate = useNavigate();
   const { tableItem } = useThemedColors();
   console.log('AnnualRetirementsTableBody :',data)
  if (data && data?.length > 0) {
     return (
        <Table.Body>
           {data?.map((item , index) => (  
              <Table.Row key={index} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                 <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                    <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                       {item.Retirement?.Employees?.personal_informations?.first_name}
                    </Text>
                 </Table.Cell>
                 
                 
                 {/* <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                    <span
                       onClick={() => navigate(`/dashboard/businesses/${item.business_id}`, { state: item })}
                       
                       fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}
                    >
                       <Text color={tableItem}  _hover={{color:"#6666ff"}} className="btn hover:[color:#6666ff] [padding:4px_9px] " fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                          {item.business_name}
                       </Text>
                    </span>
                 </Table.Cell> */}
                 
                 
                 
                 <Table.Cell fontSize={"20px"}>
                    <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                       {item.Retirement?.Employees?.personal_informations?.father_name}
                    </Text>
                 </Table.Cell>
                 <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
                    <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                       {item.Retirement?.Employees?.personal_informations?.last_name}
                    </Text>
                 </Table.Cell>
                 <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
                    <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                       {item.Retirement?.Employees?.personal_informations?.email || "N/A"}
                    </Text>
                 </Table.Cell>
                 <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>  
                    <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                       {item.Retirement?.Employees?.personal_informations?.phone_number || "N/A"}
                    </Text>
                 </Table.Cell>
                 <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>  
                    <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                       {item.Retirement?.reason || "N/A"}
                    </Text>
                 </Table.Cell>
                 <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>  
                    <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                       {item.initiate_date || "N/A"}
                    </Text>
                 </Table.Cell>
                 
                 {
                 search 
                 ?
                 <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                    
                 </Table.Cell>
                 :
                 <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                    {/* <BusinessTableActionsMenu itemId={item.business_id} itemData={item} /> */}
                 </Table.Cell>
                 }
              </Table.Row>
           ))}
        </Table.Body>
     )
  }
}

export default MonthlyRetirementsTableBody;