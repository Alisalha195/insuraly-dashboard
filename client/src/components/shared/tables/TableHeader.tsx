import { Table, Text } from "@chakra-ui/react";

import useThemedColors from '../../../hooks/useThemedColors';

const TableHeader = ({ headerData }) => {

   const { tableHead } = useThemedColors();
   return (
      <Table.Header>
         <Table.Row>
            {headerData?.map((item, index) => (
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

export default TableHeader;
