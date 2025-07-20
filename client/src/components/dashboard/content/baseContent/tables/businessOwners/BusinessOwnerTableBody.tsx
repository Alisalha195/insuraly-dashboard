import {  Table } from "@chakra-ui/react"
import TableActionsMenu from "./TableActionsMenu";
import { useNavigate } from "react-router-dom";

const BusinessOwnerTableBody = ({data , search = false}) => {
   
  const navigate = useNavigate();
   
  if(data && data?.length > 0) {
   
     return (
      <Table.Body>
         {data?.map((item , index) => ( 
            <Table.Row key={index}>
               <Table.Cell textAlign="start" fontSize={"20px"} textWrap={"nowrap"}>
                  {item.personal_informations.insurance_number}
               </Table.Cell>
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  {item.business_owner_id}
               </Table.Cell>
               <Table.Cell  fontSize={"20px"} textWrap={"nowrap"}>
                     <span 
                        className="btn hover:[color:#6666ff] [padding:4px_9px] "
                        onClick={() => navigate(`${item.business_owner_id}`,{state:item})}
                     >
                        {item.personal_informations.first_name}
                     </span>
               </Table.Cell>
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  {item.personal_informations.last_name}
               </Table.Cell>
               
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  {item.personal_informations.national_number}
               </Table.Cell>
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  {item.personal_informations.email}
               </Table.Cell>
               
               
               {
               search 
               ?
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  
               </Table.Cell>
               :
               <Table.Cell fontSize={"20px"} textWrap={"nowrap"}>
                  <TableActionsMenu itemId={item.business_owner_id} itemData={item} />
               </Table.Cell>
               }
            </Table.Row>
         ))}
      </Table.Body>
     )
   }
}

export default BusinessOwnerTableBody;