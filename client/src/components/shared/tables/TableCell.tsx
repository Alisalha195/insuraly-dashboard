import { Table } from "@chakra-ui/react"

const TableCell = ({children, ...props}:{children:React.ReactNode}) => {
  return (
    <Table.Cell  textWrap={"nowrap"} {...props}>
      {children}
    </Table.Cell>
  )
}

export default TableCell;