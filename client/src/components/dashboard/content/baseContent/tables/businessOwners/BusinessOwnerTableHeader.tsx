import {  Table } from "@chakra-ui/react"
import { businessOwnerTableHeaderData } from "./BusinessOwnerTableHeaderData"

const BusinessOwnerTableHeader = () => {
  return (
    <Table.Header>
       <Table.Row>
          {
            businessOwnerTableHeaderData.map((item , index) => (
               <Table.ColumnHeader key={index} fontSize={"20px"} textWrap={'nowrap'}>
                     {item}
               </Table.ColumnHeader>
            ))
          }
          <Table.ColumnHeader ></Table.ColumnHeader>
       </Table.Row>
    </Table.Header>
  )
}

export default BusinessOwnerTableHeader