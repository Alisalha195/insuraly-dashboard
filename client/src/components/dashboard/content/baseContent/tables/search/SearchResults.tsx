import { Flex } from "@chakra-ui/react"
import DataTable from "../../../../../shared/tables/DataTable"
import TableHeader from "../../../../../shared/tables/TableHeader";
const SearchResults = ({ resultData, headerData, tableBody }) => {

   return (
      <Flex flexDirection={'column'}
         smToMd={{ maxWidth: '70vw' }}
         smDown={{ maxWidth: '96vw' }}
         maxWidth={'98vw'}
         height={'70vh'}
      >
         <DataTable
            maxHeight={"70vh"}
            data={resultData}
            TableHeader={
               <TableHeader headerData={headerData} />
            }
            TableBody={tableBody}
            search={true}
         />
      </Flex>
   )
}

export default SearchResults;