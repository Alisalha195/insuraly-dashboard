import { Flex } from "@chakra-ui/react"
import DataTable from "../../../../../shared/DataTable"

const SearchResults = ({ resultData, tableHeader, tableBody }) => {

   return (
      <Flex flexDirection={'column'}
         smToMd={{ maxWidth: '70vw' }}
         smDown={{ maxWidth: '96vw' }}
         maxWidth={'98vw'}
         height={'70vh'}
      >
         <DataTable
            maxHeight={"300px"}
            data={resultData}
            TableHeader={tableHeader}
            TableBody={tableBody}
            search={true}
         />
      </Flex>
   )
}

export default SearchResults;