import { Table, Text } from "@chakra-ui/react";
import { businessOwnerTableHeaderData } from "./businessOwnerTableHeaderData";
import useThemedColors from '../../../../../../hooks/useThemedColors';

const BusinessOwnerTableHeader = ({ headerData }) => {

   const { tableHead } = useThemedColors();
   return (
      <Table.Header>
         <Table.Row>
            {businessOwnerTableHeaderData.map((item, index) => (
               <Table.ColumnHeader key={index} fontSize={{ xssToXs: "13px", xsToXm: "15px", xmToSm: "16px" }} textWrap={"nowrap"}>
                  <Text color={tableHead}>
                     {item}
                  </Text>
               </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader></Table.ColumnHeader>
         </Table.Row>
      </Table.Header>
   );
};

export default BusinessOwnerTableHeader;
