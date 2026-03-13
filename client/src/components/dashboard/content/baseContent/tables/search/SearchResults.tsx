import { Flex } from "@chakra-ui/react"
import DataTable from "../../../../../shared/tables/DataTable"
import TableHeader from "../../../../../shared/tables/TableHeader";
import { Suspense } from "react";
const SearchResults = ({children}:{children:React.ReactNode}) => {
// resultData, isSuccess,headerData, tableBody 
   //    if(isSuccess && resultData)   
   return (
      <Flex flexDirection={'column'}
         smToMd={{ maxWidth: '70vw' }}
         smDown={{ maxWidth: '96vw' }}
         maxWidth={'98vw'}
         // maxHeight={'50vh'}
         overflowY={'auto'}
         overflowX={'auto'}
      >
         {children}
      </Flex>
   )
}

export default SearchResults;