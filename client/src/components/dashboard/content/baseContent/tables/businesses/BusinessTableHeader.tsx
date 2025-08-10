import { Table } from "@chakra-ui/react";
import { businessTableHeaderData } from "./businessTableHeaderData";

const BusinessTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        {businessTableHeaderData.map((item, index) => (
          <Table.ColumnHeader key={index} fontSize={"20px"}>
            {item}
          </Table.ColumnHeader>
        ))}

        <Table.ColumnHeader></Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  );
};

export default BusinessTableHeader;
