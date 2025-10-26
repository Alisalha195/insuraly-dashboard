import { Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BusinessTableActionsMenu from "./BusinessTableActionsMenu";
import useThemedColors from '../../../../../../hooks/useThemedColors';

const BusinessTableBody = ({data, search = false}) => {
   
   const navigate = useNavigate();
   const { tableItem } = useThemedColors();

   if (data && data?.length > 0) {
      return (
      <Table.Body>
         {data?.map((item , index) => (  
            <Table.Row key={index} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                     {item.business_id}
                  </Text>
               </Table.Cell>
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                     {item.business_name}
                  </Text>
               </Table.Cell>
               <Table.Cell fontSize={"20px"}>
                  <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                     {item.insurance_number}
                  </Text>
               </Table.Cell>
               <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
                  <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                     {item.Business_owners.personal_informations.insurance_number}
                  </Text>
               </Table.Cell>
               <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
                  <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                     {item.financial_balance}
                  </Text>
               </Table.Cell>
               <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
                  <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                     {item.employees_count}
                  </Text>
               </Table.Cell>
               {
               search 
               ?
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  
               </Table.Cell>
               :
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  <BusinessTableActionsMenu itemId={item.business_id} itemData={item} />
               </Table.Cell>
               }
            </Table.Row>
         ))}
      </Table.Body>
      )
   }
}

export default BusinessTableBody;