import { Table } from "@chakra-ui/react"
import BusinessTableActionsMenu from "./BusinessTableActionsMenu";

const BusinessTableBody = ({data}) => {
  return (
   <Table.Body>
      {data?.map((item , index) => (  
         <Table.Row key={index}>
            <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
               {item.business_id}
               </Table.Cell>
            <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
               {item.business_name}</Table.Cell>
            <Table.Cell fontSize={"20px"}>{item.insurance_number}
               
            </Table.Cell>
            <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
               {item.Business_owners.personal_informations.insurance_number}
               </Table.Cell>
            
            <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
               {item.financial_balance}
               </Table.Cell>
            <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
               {item.employees_count}
               </Table.Cell>
            
            <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
               <BusinessTableActionsMenu itemId={item.business_id} itemData={item} />
               </Table.Cell> 
         </Table.Row>
      ))}
   </Table.Body>
  )
}

export default BusinessTableBody;